/**
 * Media Storage Utility using IndexedDB
 * Allows users to upload and persistently store large videos and images directly from their PC
 * without hitting localStorage size limitations.
 */

const DB_NAME = 'OussemaTalebCoachMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'media_blobs';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// In-memory cache of object URLs so we don't recreate them needlessly
const objectUrlCache = new Map<string, string>();

export async function saveMediaFile(key: string, file: File | Blob): Promise<string> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putRequest = store.put(file, key);

    putRequest.onsuccess = () => {
      // Revoke previous URL if any
      const existingUrl = objectUrlCache.get(key);
      if (existingUrl && existingUrl.startsWith('blob:')) {
        URL.revokeObjectURL(existingUrl);
      }

      const newUrl = URL.createObjectURL(file);
      objectUrlCache.set(key, newUrl);
      resolve(newUrl);
    };

    putRequest.onerror = () => reject(putRequest.error);
  });
}

export async function getMediaUrl(key: string): Promise<string | null> {
  if (objectUrlCache.has(key)) {
    return objectUrlCache.get(key)!;
  }

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(key);

      getRequest.onsuccess = () => {
        const result = getRequest.result as Blob | undefined;
        if (result) {
          const url = URL.createObjectURL(result);
          objectUrlCache.set(key, url);
          resolve(url);
        } else {
          resolve(null);
        }
      };

      getRequest.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('Could not read from IndexedDB:', err);
    return null;
  }
}

export async function removeMediaFile(key: string): Promise<void> {
  const existingUrl = objectUrlCache.get(key);
  if (existingUrl && existingUrl.startsWith('blob:')) {
    URL.revokeObjectURL(existingUrl);
    objectUrlCache.delete(key);
  }

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const delRequest = store.delete(key);
      delRequest.onsuccess = () => resolve();
      delRequest.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('Could not delete from IndexedDB:', err);
  }
}

/**
 * Helper to convert any image file to a base64 Data URL
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
