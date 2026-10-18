import type { PdfGenerationResult } from '../../hooks/usePdfGenerationFlow';

interface PdfResultPanelProps {
  errorMessage: string;
  result: PdfGenerationResult | null;
}

export function PdfResultPanel({ errorMessage, result }: PdfResultPanelProps) {
  return (
    <>
      {errorMessage && <div className="pdf-creator-result error"><p>{errorMessage}</p></div>}

      {result && (
        <div className={`pdf-creator-result ${result.success ? 'success' : 'error'}`}>
          {result.success ? (
            <>
              <p><strong>Sikeres PDF generálás</strong></p>
              {result.outputPath && <p>Helye: {result.outputPath}</p>}
              {result.pageCount && <p>Oldalak száma: {result.pageCount}</p>}
            </>
          ) : (
            <p>{result.error || 'Hiba történt PDF generálás közben.'}</p>
          )}
        </div>
      )}
    </>
  );
}
