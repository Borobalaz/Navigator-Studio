import "./ViewSelector.css"
import { ViewCard } from './components/ViewCard'
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import { tabManager } from "../managers/TabManager";
import { PDFSplitterScreen } from "../screens/pdf_splitter/PDFSplitterScreen";
import { globalSettings } from "../settings";
import { CSVJoinerScreen } from "../screens/csv_joiner/CSVJoinerScreen";
import { AutomaticSignerScreen } from "../screens/automatic_signer/AutomaticSignerScreen";
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
import { useEffect, useState } from "react";
import type { ProgramLabelProps } from "./components/ProgramLabel";

function openTab(label: string, component: ComponentType<any>, props: Record<string, unknown> = {}) {
  return () => {
    tabManager.addTab({ label, component, props });
  };
}

function groupContainsActiveTab(programLabelProps: ProgramLabelProps[], activeLabel: string | null) {
  return activeLabel !== null && programLabelProps.some((entry) => entry.label === activeLabel);
}

export function ViewSelector() {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  useEffect(() => {
    const handleActiveTabChange = () => setActiveLabel(tabManager.getActiveTab()?.label ?? null);

    handleActiveTabChange();
    tabManager.on("activeTabChange", handleActiveTabChange);

    return () => {
      tabManager.off("activeTabChange", handleActiveTabChange);
    };
  }, []);

  const toolsLabels = [
    { label: "PDF vágó", onClick: openTab("PDF vágó", PDFSplitterScreen, { text: "PDF vágó" }) },
    { label: "CSV összesítő", onClick: openTab("CSV összesítő", CSVJoinerScreen, { text: "CSV összesítő" }) },
    { label: "Aláírás", onClick: openTab("Aláírás", AutomaticSignerScreen, { text: "Aláírás" }) },
  ];

  //const devLabels = [
  //  { label: "ConsoleOutput", onClick: openTab("ConsoleOutput", ConsoleOutput) },
  //  { label: "ScriptStatus", onClick: openTab("ScriptStatus", ScriptStatus) },
  //  { label: "FolderList", onClick: openTab("FolderList", FolderList) },
  //  { label: "FileInput", onClick: openTab("FileInput", FileInput) },
  //];

  const databaseLabels = [
    { label: "Adatbázis kezelő", onClick: openTab("Adatbázis kezelő", DatabaseManagerScreen) },
    { label: "Adatbázis nézet", onClick: openTab("Adatbázis nézet", DatabaseViewerScreen) },
  ];

  const pdfGeneratorLabels = [
    { label: "Jövedelemigazolás", onClick: openTab("Jövedelemigazolás", JovedelemIgazolasScreen) },
    { label: "Munkaszerződés", onClick: openTab("Munkaszerződés", MunkaszerzodesCreatorScreen) },
    { label: "TSZ folyt", onClick: openTab("TSZ folyt", TszFolytScreen) },
    { label: "TSZ döntés", onClick: openTab("TSZ döntés", TszDontesScreen) },
    { label: "ESZ folyt", onClick: openTab("ESZ folyt", EszFolytScreen) },
    { label: "ESZ döntés", onClick: openTab("ESZ döntés", EszDontesScreen) },
  ];

  return (
    <div className="view-selector">
      <ViewCard
        key="1"
        icon={ConstructionIcon}
        title="Eszközök"
        active={groupContainsActiveTab(toolsLabels, activeLabel)}
        programLabelProps={toolsLabels}
      />
      {/* <ViewCard
        key="2"
        icon={BugReportIcon}
        title="Fejlesztői nézetek"
        active={groupContainsActiveTab(devLabels, activeLabel)}
        programLabelProps={devLabels}
      /> */}
      <ViewCard
        key="3"
        icon={StorageIcon}
        title="Adatbázis"
        active={groupContainsActiveTab(databaseLabels, activeLabel)}
        programLabelProps={databaseLabels}
      />
      <ViewCard
        key="4"
        icon={PictureAsPdfIcon}
        title="PDF generátor"
        active={groupContainsActiveTab(pdfGeneratorLabels, activeLabel)}
        programLabelProps={pdfGeneratorLabels}
      />
      <div className="view-selector-settings">
        <ViewCard key="10" icon={SettingsIcon} title="Beállítások" programLabelProps={[
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
