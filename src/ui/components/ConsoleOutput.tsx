import { useEffect, useState, useRef } from "react";
import "./ConsoleOutput.css";

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
    const handleStdout = (data: string) => setLog((prev) => prev + data);
    const handleStderr = (data: string) =>
      setLog((prev) => prev + "[ERR] " + data);

    window.api.onStdout(handleStdout);
    window.api.onStderr(handleStderr);

    return () => {
      // Cleanup listeners
      // @ts-ignore
      window.api.removeListener?.("exe-stdout", handleStdout);
      // @ts-ignore
      window.api.removeListener?.("exe-stderr", handleStderr);
    };
  }, []);

  if(log.length === 0) return <div className="console-output-placeholder">...</div>;
  return <pre ref={logRef} className="console-output" lang="hu">{log}</pre>;
}
