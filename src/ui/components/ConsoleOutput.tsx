import { useEffect, useState, useRef } from "react";
import "./ConsoleOutput.css";
import { stdioManager, StdEntry } from "../../managers/STDIOManager";
import { Button } from "./Button";

export function ConsoleOutput() {
  const [log, setLog] = useState<string>(() => {
    // Initialize from current manager entries
    const entries = stdioManager.getEntries();
    return entries
      .map(e => (e.type === "stderr" ? `[ERR] ${e.text}` : e.text))
      .join("");
  });

  const logRef = useRef<HTMLPreElement | null>(null);

  // Auto-scroll on new logs
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  useEffect(() => {
    // Subscribe to new entries
    const unsub = stdioManager.subscribe((entry: StdEntry | null) => {
      if (entry === null) {
        setLog(""); // Clear signal
        return;
      }

      const text = entry.type === "stderr" ? `[ERR] ${entry.text}` : entry.text;
      setLog(prev => prev + text);
    });

    return () => unsub();
  }, []);

  return (
    <div className="console-output">
      <div className="console-output-header">
        <p>STDIO Output</p>
        <Button onClick={() => stdioManager.clear()} text="Clear" />
      </div>

      <pre ref={logRef} className="console-output-content" lang="hu">
        {log}
      </pre>
    </div>
  );
}