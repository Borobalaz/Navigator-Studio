import { useEffect, useState } from "react";
import { stdioManager, StdEntry } from "../../managers/STDIOManager";
import "./ScriptStatus.css";

interface RuntimeStatusState {
  progress: number;
  exitCategory?: string;
  exitMessage?: string;
}

export function ScriptStatus() {

  const [entries, setEntries] = useState<StdEntry[]>([]);
  const [status, setStatus] = useState<RuntimeStatusState>({
    progress: 0,
  });

  useEffect(() => {
    const unsubscribe = stdioManager.subscribe((entry) => {
      if (entry == null) setEntries([]);
      if (entry?.type !== "stdout") return;

      try {
        const parsed = JSON.parse(entry.text);
        if (parsed.type === "progress") {
          setStatus(prev => ({ ...prev, progress: parsed.value }));
          console.log(parsed.value);
        }

        if (parsed.type === "exit") {
          setStatus(prev => ({ ...prev, exitCategory: parsed.category, exitMessage: parsed.message }));
        }

      } catch { }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="runtime-status-console">

      <div className="runtime-progress-container">
        <div
          className="runtime-progress-bar"
          style={{ width: `${status.progress}%` }}
        />
      </div>

      <div className="runtime-progress-text">
        {status.progress}%
      </div>

      {status.exitCategory && (
        <div className={`runtime-exit runtime-exit-${status.exitCategory.toLowerCase()}`}>
          <strong>{status.exitCategory}</strong>
          <p>{status.exitMessage}</p>
        </div>
      )}

      <div className="runtime-raw-log">
        {entries
          .filter(e => e.type === "stderr")
          .map(e => (
            <div key={e.id} className="runtime-stderr">
              {e.text}
            </div>
          ))}
      </div>

    </div>
  );
}