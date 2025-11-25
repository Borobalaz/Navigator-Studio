import "./ViewSelector.css"
import { ViewCard } from './ViewCard'
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

export function ViewSelector() {

  return (
    <div className="view-selector">
      <ViewCard key="1" icon={ConstructionIcon} />
      <ViewCard key="2" icon={ImportContactsIcon} />
      <ViewCard key="3" icon={ImportContactsIcon} />
      <ViewCard key="4" icon={ImportContactsIcon} />
      <ViewCard key="5" icon={ImportContactsIcon} />
      <div className="view-selector-settings">
        <ViewCard key="6" icon={SettingsIcon} />
      </div>
    </div>
  );
}
