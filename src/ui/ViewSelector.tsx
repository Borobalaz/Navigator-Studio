import "./ViewSelector.css"
import { ViewCard } from './components/ViewCard'
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { tabManager } from "../managers/TabManager";
import { HomeScreen } from "../screens/HomeScreen";
import { PDFSplitterScreen } from "../tooling/pdf_splitter/PDFSplitterScreen";
import { globalSettings } from "../settings";
import { CSVJoinerScreen } from "../tooling/csv_joiner/CSVJoinerScreen";
import { AutomaticSignerScreen } from "../tooling/automatic_signer/AutomaticSignerScreen";

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
