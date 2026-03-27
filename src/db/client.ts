import { DB_NAME, DB_VERSION, STORE_DEFINITIONS, type StoreIndexDefinition } from './schema';

let openPromise: Promise<IDBDatabase> | null = null;

function ensureIndex(store: IDBObjectStore, indexDef: StoreIndexDefinition): void {
  if (!store.indexNames.contains(indexDef.name)) {
    store.createIndex(indexDef.name, indexDef.keyPath, {
      unique: Boolean(indexDef.unique),
    });
  }
}

export function initNavigatorStudioDb(): Promise<IDBDatabase> {
  if (openPromise) {
    return openPromise;
  }

  openPromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      const transaction = request.transaction;
      const oldVersion = event.oldVersion;

      if (!transaction) {
        reject(new Error('Nem erheto el migracios tranzakcio.'));
        return;
      }

      // v2 keyPath migration: recreate stores because IndexedDB keyPath cannot be altered in-place.
      if (oldVersion < 2) {
        const existingStoreNames = Array.from(db.objectStoreNames);
        existingStoreNames.forEach((storeName) => {
          db.deleteObjectStore(storeName);
        });
      }

      STORE_DEFINITIONS.forEach((definition) => {
        const store = db.objectStoreNames.contains(definition.name)
          ? transaction.objectStore(definition.name)
          : db.createObjectStore(definition.name, { keyPath: definition.keyPath });

        definition.indexes.forEach((indexDef) => {
          ensureIndex(store, indexDef);
        });
      });
    };

    request.onsuccess = () => {
      const db = request.result;

      db.onversionchange = () => {
        db.close();
      };

      resolve(db);
    };

    request.onerror = () => {
      reject(request.error ?? new Error('Ismeretlen IndexedDB hiba.'));
    };

    request.onblocked = () => {
      reject(new Error('Az adatbazis frissites blokkolva van egy masik nyitott kapcsolat miatt.'));
    };
  });

  return openPromise;
}

export async function withDb<T>(callback: (db: IDBDatabase) => Promise<T> | T): Promise<T> {
  const db = await initNavigatorStudioDb();
  return callback(db);
}

export function resetDbConnectionCache(): void {
  openPromise = null;
}
