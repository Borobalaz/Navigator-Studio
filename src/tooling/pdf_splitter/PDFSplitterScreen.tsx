import "./PDFSplitterScreen.css";
import { FolderList } from "../../ui/components/FileList/FolderList";
import { ConsoleOutput } from "../../ui/components/ConsoleOutput";
import { useState } from "react";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { usePublicPath } from "../../hooks/UsePublicPathHook";
import { Button } from "../../ui/components/Button";
import { fsManager } from "../../managers/FSManager";

export function PDFSplitterScreen() {

  let selectedTemplate = useState<string>("25M30");
  const [folderPath, _setFolderPath] = usePublicPath("pdf_szetszedo");

  return (
    <div className="pdf-splitter-screen">
      <ConsoleOutput/>
      {folderPath && (
        <div className="pdf-splitter-directories-panel">
          <FolderList
            path={`${folderPath}/in/${selectedTemplate[0]}`}
            isDropZone={true}
            acceptFileTypes={[".pdf"]} />
          <DoubleArrowIcon id="pdf-splitter-arrow-icon" />
          <FolderList path={`${folderPath}/out/${selectedTemplate[0]}`} />
        </div>
      )}
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
        <Button
          onClick={async () => {
            await window.api.runExe(
              `pdf_szetszedo/pdf_szetszedo_${selectedTemplate[0]}.exe`
            );
            fsManager.emit();
          }}
          text="PDF vágása" />
      </div>
    </div >
  );
}
