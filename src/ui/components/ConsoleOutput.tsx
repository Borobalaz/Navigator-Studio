import { useEffect, useState, useRef } from "react";
import "./ConsoleOutput.css";
import { stdioManager } from "../STDIOManager";
import { Button } from "./Button";

export function ConsoleOutput() {
  const [log, setLog] = useState<string>("");
  const logRef = useRef<HTMLPreElement | null>(null);

  // Auto-scroll on new logs
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  useEffect(() => {
    const unsub = stdioManager.subscribe((entries) => {
      const text = entries
        .map((e) => (e.type === "stderr" ? `[ERR] ${e.text}` : e.text))
        .join("");
      setLog(text);
    });

    return () => unsub();
  }, []);

  return (<div className="console-output">
    <div className="console-output-header">
      <p>STDIO Output</p>
      <Button onClick={() => setLog("")} text="Clear" />
    </div>
    <pre ref={logRef} className="console-output-content" lang="hu">{log}</pre>
  </div>);
}
