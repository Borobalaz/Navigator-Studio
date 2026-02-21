import "./CSVJoinerScreen.css";
import { FileInput } from "../../ui/components/FileList/FileInput";
import { FolderList } from "../../ui/components/FileList/FolderList";
import { usePublicPath } from "../../hooks/UsePublicPathHook";
import { Button } from "../../ui/components/Button";
import { useState } from "react";
import { ConsoleOutput } from "../../ui/components/ConsoleOutput";

export function CSVJoinerScreen() {

  const [excelFilePath, setExcelFilePath] = useState<string[]>([]);
  const [folderPath, _setFolderPath] = usePublicPath("csv_joiner");
  return (
    <div className="csv-joiner-screen">
      <div className="csv-joiner-controls">
        <ConsoleOutput />
        <FileInput 
          onFilesSelected={(paths) => setExcelFilePath(paths[0] ? [paths[0]] : [])}
          acceptFileTypes={["application/vnd.ms-excel"]} 
          multiple={false}
        />
        <Button onClick={() => window.api.runExe("csv_joiner/csv_joiner.exe", excelFilePath)} text="CSV összefűzése" />
      </div>
      {folderPath && <FolderList path={`${folderPath}/csvs`} />}
    </div >
  );
}
