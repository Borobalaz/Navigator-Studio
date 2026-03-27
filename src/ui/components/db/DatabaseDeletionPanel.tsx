import { useState } from 'react';
import { Button } from '../inputs/Button';
import { clearAllDatabaseStores } from '../../../db';
import '../../../screens/DatabaseManagerScreen.css';

export function DatabaseDeletionPanel() {
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const clearDatabase = async () => {
    if (!isConfirmed) {
      setErrorMessage('Jelöld be a megerősítést az adatbázis törléséhez.');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setIsClearing(true);

    try {
      await clearAllDatabaseStores();
      setSuccessMessage('Az adatbázis tartalma törölve lett.');
      setIsConfirmed(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="database-manager-panel">
      <h2>Törlés</h2>
      <p>Rekordok törlése az adatbázisból</p>
      <section className="database-manager-section">
        <h3>Adatbázis törlése</h3>
        <p className="database-delete-warning">
          Ez a művelet minden tárolt rekordot töröl az összes táblából.
        </p>
        <label className="database-delete-confirm-row">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
          Megerositem, hogy az osszes adat torolheto.
        </label>
        <div className="database-manager-actions">
          <Button
            onClick={() => {
              void clearDatabase();
            }}
            text={isClearing ? 'Torles folyamatban...' : 'Adatbázis törlése'}
          />
        </div>
      </section>

      {successMessage && <div className="database-manager-success">{successMessage}</div>}
      {errorMessage && <div className="database-manager-error">{errorMessage}</div>}
    </div>
  );
}
