import "./PDFSplitterScreen.css";
import { FolderList } from "../../ui/components/FileList/FolderList";
import { ConsoleOutput } from "../../ui/components/ConsoleOutput";
import { useEffect, useState } from "react";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export function PDFSplitterScreen() {

  let selectedTemplate = useState<string>("25M30");
  const [folderPath, setFolderPath] = useState<string | null>(null);

  useEffect(() => {
    async function loadPath() {
      const path = await window.api.getPublicPath("pdf_szetszedo");
      setFolderPath(path);
    }

    loadPath();
  }, []);

  return (
    <div className="pdf-splitter-screen">
      <div className="pdf-splitter-output">
        <p>Output</p>
        <ConsoleOutput />
      </div>
      <div className="pdf-splitter-directories-panel">
        <FolderList
          relativePath={folderPath ? `${folderPath}/in/${selectedTemplate[0]}` : ""}
          isDropZone={true}
          acceptFileTypes={[".pdf"]} />
        <DoubleArrowIcon id="pdf-splitter-arrow-icon" />
        <FolderList relativePath={folderPath ? `${folderPath}/out/${selectedTemplate[0]}` : ""} />
      </div>
      <div className="pdf-splitter-control-panel">
        <div className="pdf-splitter-control-panel-selector">
          <p>Séma: </p>
          <select value={selectedTemplate[0]} onChange={(e) => selectedTemplate[1](e.target.value)}>
            <option value="25M30">25M30</option>
            <option value="24M30">24M30</option>
            <option value="BER">Bér</option>
            <option value="EFO">EFO</option>
            <option value="JAR">Járulék</option>
          </select>
        </div>
        <button onClick={() => window.api.runExe(folderPath ? `${folderPath}/pdf_szetszedo_${selectedTemplate[0]}.exe` : "")}>PDF vágása</button>
      </div>
    </div>
  );
}
