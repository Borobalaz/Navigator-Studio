import { useState } from 'react';

export type PdfGenerationResult = {
  success: boolean;
  outputPath?: string;
  pageCount?: number;
  error?: string;
};

type BuildPayloadResult = {
  outputPath: string;
  payload: Record<string, any>;
} | null;

interface GenerateParams {
  companyId: string;
  templateId: string;
  buildPayload: () => BuildPayloadResult;
  validate?: () => string | null;
}

interface UsePdfGenerationFlowResult {
  outputFolder: string;
  isLoading: boolean;
  result: PdfGenerationResult | null;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  pickOutputFolder: () => Promise<void>;
  generate: (params: GenerateParams) => Promise<void>;
}

export function usePdfGenerationFlow(initialErrorMessage = ''): UsePdfGenerationFlowResult {
  const [outputFolder, setOutputFolder] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PdfGenerationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  const pickOutputFolder = async () => {
    const folder = await window.api.selectFolder(outputFolder || undefined);
    if (folder) {
      setOutputFolder(folder);
    }
  };

  const generate = async ({ companyId, templateId, buildPayload, validate }: GenerateParams) => {
    setErrorMessage('');
    setResult(null);

    if (!companyId) {
      setErrorMessage('Válassz céget.');
      return;
    }

    if (!outputFolder) {
      setErrorMessage('Válassz kimeneti mappát.');
      return;
    }

    const validationError = validate?.();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const data = buildPayload();
    if (!data) {
      setErrorMessage('Nincs elég adat a PDF generáláshoz.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await window.api.createSchematicPdf({
        companyId,
        templateId,
        payload: data.payload,
        outputPath: data.outputPath,
        autoOpen: true,
      });
      setResult(response);
    } catch (e) {
      setResult({
        success: false,
        error: e instanceof Error ? e.message : 'Ismeretlen hiba',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { outputFolder, isLoading, result, errorMessage, setErrorMessage, pickOutputFolder, generate };
}
