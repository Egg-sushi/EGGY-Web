const EGGY_STORAGE_TEST_KEY = 'EGGY_STORAGE_TEST_KEY';
const EGGY_STORAGE_TEST_VALUE = 'EGGY_STORAGE_TEST_VALUE';

interface Storage {
  get(key: string, remove?: boolean): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

class MapStorage implements Storage {
  private map = new Map<string, string>();

  public get(key: string, remove: boolean = false) {
    const item = this.map.get(key) ?? null;
    if (remove) {
      this.remove(key);
    }
    return item;
  }

  public set(key: string, value: string) {
    this.map.set(key, value);
  }

  public remove(key: string) {
    this.map.delete(key);
  }
}

class SessionStorage implements Storage {
  public get(key: string, remove: boolean = false) {
    const item = sessionStorage.getItem(key);
    if (remove) {
      this.remove(key);
    }
    return item;
  }

  public set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public remove(key: string) {
    sessionStorage.removeItem(key);
  }
}

const canAccessSessionStorage = () => {
  try {
    sessionStorage.setItem(EGGY_STORAGE_TEST_KEY, EGGY_STORAGE_TEST_VALUE);
    sessionStorage.removeItem(EGGY_STORAGE_TEST_KEY);
    return true;
  } catch (err) {
    return false;
  }
};

const createSessionStorage = () => {
  if (canAccessSessionStorage()) {
    return new SessionStorage();
  }
  return new MapStorage();
};

export const safeSessionStorage = createSessionStorage();
