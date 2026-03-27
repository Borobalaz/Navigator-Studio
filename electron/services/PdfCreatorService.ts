import Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { app, BrowserWindow } from 'electron';
import type { TemplateDelegate } from 'handlebars';

export interface PdfGenerationRequest {
  companyId: string;
  templateId: string;
  payload: Record<string, any>;
  outputPath: string;
  autoOpen?: boolean;
}

export interface PdfGenerationResponse {
  success: boolean;
  outputPath?: string;
  pageCount?: number;
  error?: string;
}

export class PdfCreatorService {
  /**
   * Get the path to the PDF templates directory
   * Handles both dev and packaged app contexts
   */
  private static getTemplateDir(): string {
    if (process.env.VITE_DEV_SERVER_URL) {
      // Development mode
      return path.join(process.cwd(), 'public', 'pdf_templates');
    } else {
      // Packaged mode
      const resourcesBase = process.resourcesPath || path.join(path.dirname(app.getAppPath()), '..');
      return path.join(resourcesBase, 'public', 'pdf_templates');
    }
  }

  /**
   * Load and compile a Handlebars template
   */
  static async loadTemplate(templateId: string): Promise<TemplateDelegate> {
    const templateDir = this.getTemplateDir();
    const templatePath = path.join(templateDir, `${templateId}.html`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Sablon nem található: ${templateId}`);
    }

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const compiled = Handlebars.compile(templateContent);
    return compiled as TemplateDelegate;
  }

  /**
   * Render a template with the provided payload
   */
  static async renderTemplate(template: TemplateDelegate, payload: Record<string, any>): Promise<string> {
    try {
      return template(payload);
    } catch (error) {
      throw new Error(`Sablon renderelés hiba: ${error instanceof Error ? error.message : 'Ismeretlen hiba'}`);
    }
  }

  /**
   * Generate a PDF from HTML content
   * Uses Electron's built-in webContents.printToPDF() for reliable PDF generation
   */
  static async generatePdf(html: string, outputPath: string): Promise<{ success: boolean; pageCount: number }> {
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create a hidden window for rendering
    const win = new BrowserWindow({
      webPreferences: {
        sandbox: true,
      },
      show: false,
    });

    try {
      // Load the HTML content directly
      await win.webContents.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);

      // Print to PDF
      const pdfData = await win.webContents.printToPDF({
        margins: {
          marginType: 'printableArea',
        },
        pageSize: 'A4',
        printBackground: true,
      });

      // Write PDF file
      await fs.promises.writeFile(outputPath, pdfData);

      // Estimate page count based on PDF content
      // A rough estimation: each PDF page is roughly 10KB-20KB
      const pageCount = Math.max(1, Math.ceil(pdfData.length / 15000));

      return { success: true, pageCount };
    } catch (error) {
      throw new Error(`PDF generálás hiba: ${error instanceof Error ? error.message : 'Ismeretlen hiba'}`);
    } finally {
      // Clean up
      if (!win.isDestroyed()) {
        win.destroy();
      }
    }
  }

  /**
   * Save and optionally open the generated PDF
   */
  static async saveAndOpen(filePath: string, autoOpen: boolean = true): Promise<void> {
    if (autoOpen) {
      try {
        const { default: open } = await import('open' as any);
        // Do not block the generation response on external viewer startup.
        void open(filePath).catch((error: unknown) => {
          console.warn(
            `Nem sikerult megnyitni a PDF-et: ${error instanceof Error ? error.message : 'Ismeretlen hiba'}`,
          );
        });
      } catch (error) {
        console.warn(`Nem sikerült megnyitni a PDF-et: ${error instanceof Error ? error.message : 'Ismeretlen hiba'}`);
        // Don't throw - the file was still created successfully
      }
    }
  }

  /**
   * Create a schematic PDF for a company with employees
   * Main entry point for PDF generation
   */
  static async createSchematicPdf(request: PdfGenerationRequest): Promise<PdfGenerationResponse> {
    try {
      // Load and compile template
      const template = await this.loadTemplate(request.templateId);

      // Render template with payload
      const html = await this.renderTemplate(template, request.payload);

      // Generate PDF
      const { pageCount } = await this.generatePdf(html, request.outputPath);

      // Save and optionally open
      await this.saveAndOpen(request.outputPath, request.autoOpen ?? true);

      return {
        success: true,
        outputPath: request.outputPath,
        pageCount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Ismeretlen hiba történt a PDF generálás során',
      };
    }
  }
}
