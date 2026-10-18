import "./ViewSelector.css"
import { ViewCard } from './components/ViewCard'
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import { tabManager } from "../managers/TabManager";
import { PDFSplitterScreen } from "../screens/pdf_splitter/PDFSplitterScreen";
import { globalSettings } from "../settings";
import { CSVJoinerScreen } from "../screens/csv_joiner/CSVJoinerScreen";
import { AutomaticSignerScreen } from "../screens/automatic_signer/AutomaticSignerScreen";
import { ConsoleOutput } from "./components/ConsoleOutput";
import { ScriptStatus } from "./components/ScriptStatus";
import { FolderList } from "./components/FileList/FolderList";
import { FileInput } from "./components/FileList/FileInput";
import BugReportIcon from '@mui/icons-material/BugReport';
import StorageIcon from '@mui/icons-material/Storage';
import { DatabaseManagerScreen } from "../screens/DatabaseManagerScreen";
import { DatabaseViewerScreen } from "../screens/DatabaseViewerScreen";
import { JovedelemIgazolasScreen } from "../screens/pdf_generator/JovedelemIgazolasScreen";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { MunkaszerzodesCreatorScreen } from "../screens/pdf_generator/MunkaszerzodesCreatorScreen";
import { TszFolytScreen } from "../screens/pdf_generator/TszFolytScreen";
import { TszDontesScreen } from "../screens/pdf_generator/TszDontesScreen";
import { EszFolytScreen } from "../screens/pdf_generator/EszFolytScreen";
import { EszDontesScreen } from "../screens/pdf_generator/EszDontesScreen";
import type { ComponentType } from "react";

function openTab(label: string, component: ComponentType<any>, props: Record<string, unknown> = {}) {
  return () => {
    tabManager.addTab({ label, component, props });
  };
}

export function ViewSelector() {

  return (
    <div className="view-selector">
      <ViewCard key="1" icon={ConstructionIcon} programLabelProps={[
        { label: "PDF vágó", onClick: openTab("PDF vágó", PDFSplitterScreen, { text: "PDF vágó" }) },
        { label: "CSV összesítő", onClick: openTab("CSV összesítő", CSVJoinerScreen, { text: "CSV összesítő" }) },
        { label: "Aláírás", onClick: openTab("Aláírás", AutomaticSignerScreen, { text: "Aláírás" }) },
      ]} />
      <ViewCard key="2" icon={BugReportIcon} programLabelProps={[
        { label: "ConsoleOutput", onClick: openTab("ConsoleOutput", ConsoleOutput) },
        { label: "ScriptStatus", onClick: openTab("ScriptStatus", ScriptStatus) },
        { label: "FolderList", onClick: openTab("FolderList", FolderList) },
        { label: "FileInput", onClick: openTab("FileInput", FileInput) },
      ]} />
      <ViewCard key="3" icon={StorageIcon} programLabelProps={[
        { label: "Adatbázis kezelő", onClick: openTab("Adatbázis kezelő", DatabaseManagerScreen) },
        { label: "Adatbázis nézet", onClick: openTab("Adatbázis nézet", DatabaseViewerScreen) },
      ]} />
      <ViewCard key="4" icon={PictureAsPdfIcon} programLabelProps={[
        { label: "Jövedelemigazolás", onClick: openTab("Jövedelemigazolás", JovedelemIgazolasScreen) },
        { label: "Munkaszerződés", onClick: openTab("Munkaszerződés", MunkaszerzodesCreatorScreen) },
        { label: "TSZ folyt", onClick: openTab("TSZ folyt", TszFolytScreen) },
        { label: "TSZ döntés", onClick: openTab("TSZ döntés", TszDontesScreen) },
        { label: "ESZ folyt", onClick: openTab("ESZ folyt", EszFolytScreen) },
        { label: "ESZ döntés", onClick: openTab("ESZ döntés", EszDontesScreen) },
      ]} />
      <div className="view-selector-settings">
        <ViewCard key="10" icon={SettingsIcon} programLabelProps={[
          {
            label: "Sötét téma", onClick: () => {
              globalSettings.set("darkMode", !globalSettings.get("darkMode", false));
            }
          },
        ]} />
      </div>
    </div>
  );
}
