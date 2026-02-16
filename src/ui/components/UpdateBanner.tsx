import { useEffect, useState } from "react";

export function UpdateBanner() {
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (status) {
      setError("");
    }
  }, [status]);

  useEffect(() => {
    window.updater.onStatus(setStatus);
    window.updater.onProgress(setProgress);
    window.updater.onError((msg) => {
      console.error("Update error:", msg);
      setError(msg);
    });
    window.updater.onReady(() => {
      setIsReady(true);
    });
  }, []);

  const handleRestart = () => {
    window.updater.restartAndInstall();
  };

  if (!status && !isReady && !error) {
    return null;
  }

  if (error) {
    return (
      <div style={{ padding: "10px", backgroundColor: "#ffebee", color: "#c62828", borderRadius: "4px" }}>
        <p>Update error: {error}</p>
      </div>
    );
  }

  if (isReady) {
    return (
      <div style={{ padding: "10px", backgroundColor: "#e8f5e9", color: "#2e7d32", borderRadius: "4px" }}>
        <p>Update ready! Restart now to install.</p>
        <button onClick={handleRestart} style={{ marginTop: "8px", padding: "6px 12px", cursor: "pointer" }}>
          Restart & Install
        </button>
      </div>
    );
  }

  if (status) {
    return (
      <div style={{ padding: "10px", backgroundColor: "#e3f2fd", color: "#1565c0", borderRadius: "4px" }}>
        <p>{status}</p>
        {progress > 0 && (
          <div style={{ marginTop: "8px" }}>
            <progress value={progress} max={100} style={{ width: "100%" }} />
            <span style={{ marginLeft: "10px", fontSize: "0.9em" }}>{progress}%</span>
          </div>
        )}
      </div>
    );
  }

  return null;
}
