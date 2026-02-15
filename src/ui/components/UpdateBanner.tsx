import { useEffect, useState } from "react";

export function UpdateBanner() {
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.updater.onStatus(setStatus);
    window.updater.onProgress(setProgress);
    window.updater.onReady(() => {
      alert("Update ready! Restart app.");
    });
  }, []);

  if(status === "") return (<div>Naprakész az alkalmazás!</div>);
  return (
    <div>
      <p>{status}</p>
      {progress > 0 && <progress value={progress} max={100} />}
    </div>
  );
}
