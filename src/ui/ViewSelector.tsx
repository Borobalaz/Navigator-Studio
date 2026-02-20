import "./ViewSelector.css"
import { ViewCard } from './components/ViewCard'
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { tabManager } from "./TabManager";
import { HomeScreen } from "../screens/HomeScreen";
import { PDFSplitterScreen } from "../tooling/pdf_splitter/PDFSplitterScreen";
import { globalSettings } from "../settings";
import { CSVJoinerScreen } from "../tooling/csv_joiner/CSVJoinerScreen";

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
          label: "Számla kerekítő", onClick: () => {
            tabManager.addTab({
              label: "Számla kerekítő",
              component: HomeScreen,
              props: { text: "Számla kerekítő" }
            })
          }
        },
        {
          label: "CSV összefűzése", onClick: () => {
            tabManager.addTab({
              label: "CSV összefűzése",
              component: CSVJoinerScreen,
              props: { text: "CSV összefűzése" }
            })
          }
        },
      ]} />
      <ViewCard key="2" icon={ImportContactsIcon} programLabelProps={[
        {
          label: "Teendők", onClick: () => {
            tabManager.addTab({
              label: "Teendők",
              component: HomeScreen,
              props: { text: "Teendők" }
            })
          }
        },
      ]} />
      <div className="view-selector-settings">
        <ViewCard key="6" icon={SettingsIcon} programLabelProps={[
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
