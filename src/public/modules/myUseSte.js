export let useState = (prop) => {
  let inicial = prop;
  let State = () => inicial;
  let getState = (dato) => {
    inicial = dato;
  };
  return [State, getState];
};
