import React from "react";

const useStateObjectWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(localStorageKey))
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ""
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};

export default { useStateWithLocalStorage, useStateObjectWithLocalStorage };
