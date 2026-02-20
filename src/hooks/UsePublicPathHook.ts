import { useEffect, useState } from "react";

export function usePublicPath(subfolder: string = ""): [string, (newPath: string) => void] {
  const [folderPath, setFolderPath] = useState<string>("");

  useEffect(() => {
    async function loadPath() {
      const path = await window.api.getPublicPath(subfolder);
      setFolderPath(path);
    }

    loadPath();
  }, []);

  return [folderPath, setFolderPath];
}