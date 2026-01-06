const get = <T = any>(k: string): T | null => {
  try {
    const v = localStorage.getItem(k);

    return v ? (JSON.parse(v) as T) : null;
  } catch {
    return null;
  }
};

const set = <T = any>(k: string, v: T): void => {
  localStorage.setItem(k, JSON.stringify(v));
};

const remove = (k: string): void => {
  localStorage.removeItem(k);
};

export const localStorageHelper = { get, set, remove };
