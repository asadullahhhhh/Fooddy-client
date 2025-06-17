const localStorageGetItem = () => {
  const item = localStorage.getItem("cart");
  if (item) {
    const converted = JSON.parse(item);
    return converted;
  }
  return [];
};

const saveLocalStorage = (cart) => {
  const stringifyData = JSON.stringify(cart);
  localStorage.setItem("cart", stringifyData);
};

export { localStorageGetItem as getElement, saveLocalStorage as setElement };
