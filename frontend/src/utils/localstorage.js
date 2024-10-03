export const localStorageSet = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageGet = (key) => {
  const value = localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const localStorageRemove = (key) => {
  localStorage.removeItem(key);
};
