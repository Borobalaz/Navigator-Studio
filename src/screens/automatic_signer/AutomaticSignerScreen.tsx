import "./AutomaticSignerScreen.css";
import { FileInput } from "../../ui/components/FileList/FileInput";
import { FolderList } from "../../ui/components/FileList/FolderList";
import { usePublicPath } from "../../hooks/usePublicPath";
import { Button } from "../../ui/components/inputs/Button";
import { useState } from "react";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { ScriptStatus } from "../../ui/components/ScriptStatus";
import { stdioManager } from "../../managers/STDIOManager";

export function AutomaticSignerScreen() {

  const [signatureFilePath, setSignatureFilePath] = useState<string[]>([]);
  const [folderPath, _setFolderPath] = usePublicPath("automatic_signer");
  return (
    <div className="signer-screen">
      <ScriptStatus />
      <div className="signer-controls">
        <FileInput
          onFilesSelected={(paths) => setSignatureFilePath(paths[0] ? [paths[0]] : [])}
          acceptFileTypes={["image/jpg", "image/png"]}
          multiple={false}
          text="Aláírás"
        />
        <Button onClick={async () => {
          await stdioManager.clear();
          await window.api.runExe("automatic_signer/automatikus_alairas.exe", signatureFilePath);
        }}
          text="Aláírás" />
      </div>
      <div className="signer-directories-panel">
        {folderPath && (
          <div className="signer-directories-panel">
            <FolderList
              path={`${folderPath}/input`}
              isDropZone={true}
              acceptFileTypes={[".pdf"]} />
            <DoubleArrowIcon id="signer-arrow-icon" />
            <FolderList path={`${folderPath}/output`} />
          </div>
        )}
      </div>
    </div >
  );
}
