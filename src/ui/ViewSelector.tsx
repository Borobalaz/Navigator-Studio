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

export function ViewSelector() {

  return (
    <div className="view-selector">
      <ViewCard key="1" icon={ConstructionIcon} programLabelProps={[
        {
          label: "PDF vágó", onClick: () => {
            tabManager.addTab({
              label: "PDF vágó",
              component: PDFSplitterScreen,
              props: { text: "PDF vágó" }
            })
          }
        },
        {
          label: "CSV összesítő", onClick: () => {
            tabManager.addTab({
              label: "CSV összesítő",
              component: CSVJoinerScreen,
              props: { text: "CSV összesítő" }
            })
          }
        },
        {
          label: "Aláírás", onClick: () => {
            tabManager.addTab({
              label: "Aláírás",
              component: AutomaticSignerScreen,
              props: { text: "Aláírás" }
            })
          }
        },
      ]} />
      <ViewCard key="2" icon={BugReportIcon} programLabelProps={[
        {
          label: "ConsoleOutput", onClick: () => {
            tabManager.addTab({
              label: "ConsoleOutput",
              component: ConsoleOutput,
              props: {}
            })
          }
        },
        {
          label: "ScriptStatus", onClick: () => {
            tabManager.addTab({
              label: "ScriptStatus",
              component: ScriptStatus,
              props: {}
            })
          }
        },
        {
          label: "FolderList", onClick: () => {
            tabManager.addTab({
              label: "FolderList",
              component: FolderList,
              props: {}
            })
          }
        },
        {
          label: "FileInput", onClick: () => {
            tabManager.addTab({
              label: "FileInput",
              component: FileInput,
              props: {}
            })
          }
        },

      ]} />
      <ViewCard key="3" icon={StorageIcon} programLabelProps={[
        {
          label: "Adatbázis kezelő", onClick: () => {
            tabManager.addTab({
              label: "Adatbázis kezelő",
              component: DatabaseManagerScreen,
              props: {}
            })
          }
        },
        {
          label: "Adatbázis nézet", onClick: () => {
            tabManager.addTab({
              label: "Adatbázis nézet",
              component: DatabaseViewerScreen,
              props: {}
            })
          }
        },
      ]} />
      <ViewCard key="4" icon={PictureAsPdfIcon} programLabelProps={[
        {
          label: "Jövedelemigazolás", onClick: () => {
            tabManager.addTab({
              label: "Jövedelemigazolás",
              component: JovedelemIgazolasScreen,
              props: {}
            })
          }
        },
        {
          label: "Munkaszerződés", onClick: () => {
            tabManager.addTab({
              label: "Munkaszerződés",
              component: MunkaszerzodesCreatorScreen,
              props: {}
            })
          }
        },
        {
          label: "TSZ folyt", onClick: () => {
            tabManager.addTab({
              label: "TSZ folyt",
              component: TszFolytScreen,
              props: {}
            })
          }
        },
        {
          label: "TSZ döntés", onClick: () => {
            tabManager.addTab({
              label: "TSZ döntés",
              component: TszDontesScreen,
              props: {}
            })
          }
        },
        {
          label: "ESZ folyt", onClick: () => {
            tabManager.addTab({
              label: "ESZ folyt",
              component: EszFolytScreen,
              props: {}
            })
          }
        },
        {
          label: "ESZ döntés", onClick: () => {
            tabManager.addTab({
              label: "ESZ döntés",
              component: EszDontesScreen,
              props: {}
            })
          }
        },

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
