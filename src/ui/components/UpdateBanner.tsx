import { useEffect, useState } from "react";
import "./UpdateBanner.css";
import { Slider } from "@mui/material";

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

  //if (!status && !isReady && !error) {
  //  return (
  //    <div className={`update-banner ${status}`}>
  //      Az alkalmazás naprakész!
  //    </div>
  //  );
  //}

  if (error) {
    return (
      <div className="update-banner">
        Update error: {error}
      </div>
    );
  }

  if (isReady) {
    return (
      <div className={`update-banner update-ready`}>
        <button onClick={handleRestart}>
          Újraindítás
        </button>
        Update ready! Restart now to install.
      </div>
    );
  }

  if (status) {
    return (
      <div className="update-banner update-downloading">
        <Slider
          value={progress ?? 0}
          max={100}
          className="update-slider"
        />

        {progress > 0 && (
          <div className="progress-info">
            <span>{progress}%</span>
          </div>
        )}
        <div className="status-text">
          {status}
        </div>
      </div>
    );
  }

  return null;
}
