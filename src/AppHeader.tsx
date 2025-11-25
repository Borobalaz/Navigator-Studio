import "./AppHeader.css"
import pkg from "../package.json";

export function AppHeader() {


  return (
    <div className="app-header">
      <p>Navigator Studio {pkg.version}</p>
    </div>
  );
}