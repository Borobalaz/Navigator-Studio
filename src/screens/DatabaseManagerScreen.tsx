import { DatabaseImporterPanel } from '../ui/components/db/DatabaseImporterPanel';
import { EmployeeImporterPanel } from '../ui/components/db/EmployeeImporterPanel';
import { DatabaseDeletionPanel } from '../ui/components/db/DatabaseDeletionPanel';
import './DatabaseManagerScreen.css';

export function DatabaseManagerScreen() {
  return (
    <div className="screen-base database-manager-screen">
      <div className="database-manager-stack">
        <DatabaseImporterPanel />
        <EmployeeImporterPanel />
        <DatabaseDeletionPanel />
      </div>
    </div>
  );
}
