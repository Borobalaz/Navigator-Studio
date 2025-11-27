import "./ViewSelector.css"
import { ViewCard } from './ViewCard'
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { tabManager } from "../TabManager";
import { HomeScreen } from "../screens/HomeScreen";

export function ViewSelector() {

  return (
    <div className="view-selector">
      <ViewCard key="1" icon={ConstructionIcon} programLabelProps={[
        {
          label: "asd", onClick: () => {
            tabManager.addTab({
              label: "asd",
              component: HomeScreen,
              props: { text: "asd" }
            })
          }
        },
      ]} />
      <ViewCard key="2" icon={ImportContactsIcon} programLabelProps={[
        {
          label: "asd2", onClick: () => {
            tabManager.addTab({
              label: "asd2",
              component: HomeScreen,
              props: { text: "asd2" }
            })
          }
        },
      ]} />
      <ViewCard key="3" icon={ImportContactsIcon} programLabelProps={[
        {
          label: "asd", onClick: () => {
            tabManager.addTab({
              label: "asd",
              component: HomeScreen,
              props: { text: "asd" }
            })
          }
        },
      ]} />
      <div className="view-selector-settings">
        <ViewCard key="6" icon={SettingsIcon} programLabelProps={[
          {
            label: "asd", onClick: () => {
              tabManager.addTab({
                label: "asd",
                component: HomeScreen,
                props: { text: "asd" }
              })
            }
          },
        ]} />
      </div>
    </div>
  );
}
