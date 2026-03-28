import "./CSVJoinerScreen.css";
import { FileInput } from "../../ui/components/FileList/FileInput";
import { FolderList } from "../../ui/components/FileList/FolderList";
import { usePublicPath } from "../../hooks/usePublicPath";
import { Button } from "../../ui/components/inputs/Button";
import { useState } from "react";
import { ScriptStatus } from "../../ui/components/ScriptStatus";

export function CSVJoinerScreen() {

  const [excelFilePath, setExcelFilePath] = useState<string[]>([]);
  const [folderPath, _setFolderPath] = usePublicPath("csv_joiner");
  return (
    <div className="csv-joiner-screen">
      <ScriptStatus />
      <div className="csv-joiner-controls">
        <FileInput
          onFilesSelected={(paths) => setExcelFilePath(paths[0] ? [paths[0]] : [])}
          acceptFileTypes={["application/vnd.ms-excel"]}
          multiple={false}
        />
        <Button onClick={async () => {
          await window.api.runExe("csv_joiner/csv_joiner.exe", excelFilePath);
          await window.api.openFile("csv_joiner/combined.xlsx");
        }} text="CSV összefűzése" />
      </div>
      {folderPath && <FolderList path={`${folderPath}/csvs`} />}
    </div >
  );
}
