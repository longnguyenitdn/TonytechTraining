export const removePass = (obj) => {
  const { pass, ...rest } = obj;
  return rest;
};
