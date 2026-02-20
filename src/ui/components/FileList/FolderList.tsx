import { useEffect, useState, useRef } from "react";
import { FolderItem } from "./FolderItem";
import "./FolderList.css";
import { fsManager } from "../../../managers/FSManager";

type FolderEntry = {
  name: string;
  isDirectory: boolean;
};

export function FolderList({
  path,
  isDropZone = false,
  acceptFileTypes = [],
}: {
  path: string;
  isDropZone?: boolean;
  acceptFileTypes?: string[];
}) {
  const [items, setItems] = useState<FolderEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const refreshRef = useRef<HTMLButtonElement | null>(null);

  const load = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.stopPropagation();
    try {
      const result = await window.api.readFolder(path);
      setItems(result);
      setError(null);
    } catch {
      setError("Failed to read folder");
    }
  };

  useEffect(() => {
    const unsub = fsManager.subscribe(() => load());
    load();
  }, [path]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDropZone) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDropZone) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDropZone) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    // Filter files by accepted types
    const filesToCopy = Array.from(files).filter((file) => {
      if (acceptFileTypes.length === 0) return true;
      return acceptFileTypes.some((type) => {
        if (type.includes("/")) {
          // MIME type like "application/pdf"
          return file.type === type;
        } else {
          // Extension like ".pdf"
          return file.name.endsWith(type);
        }
      });
    });

    if (filesToCopy.length === 0) {
      setError("No valid files to copy");
      return;
    }

    try {
      for (const file of filesToCopy) {
        await window.api.copyFileToFolder(path, file);
      }
      // Reload folder contents
      const result = await window.api.readFolder(path);
      setItems(result);
    } catch (err) {
      setError(`Failed to copy file: ${err}`);
    }
  };

  if (error) return <div className="folder-list-error">{error}</div>;
  return (
    <div
      className={`folder-list ${isDropZone ? "drop-zone" : ""} ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ position: "relative" }}
    >
      <p className="folder-list-path"
        onClick={() => window.api.openFolder(path)}>{path}</p>
      <button
        ref={refreshRef}
        onClick={load}
        title="Frissítés"
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          fontSize: 18,
          padding: 0,
          zIndex: 1,
        }}
        aria-label="Refresh"
      >
        &#x21bb;
      </button>
      {items.length === 0 && <div className="folder-list-empty">A mappa üres</div>}
      {items.map((item) => (
        <FolderItem
          key={item.name}
          name={item.name}
          isDirectory={item.isDirectory}
        />
      ))}
    </div>
  );
}
