import React, { useRef, useState } from "react";
import "./FileInput.css";

function formatSize(n: number) {
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
  return (n / (1024 * 1024)).toFixed(1) + " MB";
}

type FileInputProps = {
  onFilesSelected: (paths: string[]) => void;
  acceptFileTypes?: string[];
  multiple?: boolean;
};

type ElectronFile = File & { path: string };

export function FileInput({
  onFilesSelected,
  acceptFileTypes = [],
  multiple = false,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const prevent = (e: React.DragEvent | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFiles = (fileList: FileList) => {
    setFiles(fileList);

    const paths = Array.from(fileList).map(
      (file) => (file as ElectronFile).path
    );

    onFilesSelected(paths);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    prevent(e);
    setIsDragOver(false);

    const f = e.dataTransfer.files;
    if (f && f.length) handleFiles(f);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    if (f && f.length) handleFiles(f);
  };

  const openFileDialog = () => inputRef.current?.click();

  return (
    <div
      className={`file-input ${isDragOver ? "drag-over" : ""}`}
      onDragOver={(e) => {
        prevent(e as any);
        setIsDragOver(true);
      }}
      onDragEnter={(e) => {
        prevent(e as any);
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        prevent(e as any);
        setIsDragOver(false);
      }}
      onDrop={onDrop}
      onClick={openFileDialog}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") openFileDialog();
      }}
    >
      <input
        ref={inputRef}
        className="file-input-hidden"
        type="file"
        id="file"
        name="file"
        onChange={onChange}
        accept={acceptFileTypes.join(",")}
        multiple={multiple}
      />

      <div className="file-input-inner">
        <svg
          className="file-input-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="48"
          height="48"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M19 9h-4V3H5v18h14V9zM8 7h6v4H8V7zm8 12H6V5h1v5h9v9z"
          />
        </svg>

        <div className="file-input-text">
          <strong>Húzd ide a fájlokat</strong>
          <span className="muted">
            vagy kattints a gépedről való kiválasztáshoz
          </span>
        </div>
      </div>

      {files && (
        <ul className="file-preview">
          {Array.from(files).map((f) => (
            <li key={(f as ElectronFile).path} className="file-preview-item">
              <span className="file-name">{f.name}</span>
              <span className="file-size">{formatSize(f.size)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}