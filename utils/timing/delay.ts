const delay = <T>(ms: number, resVal?: T) =>
  new Promise((r) => setTimeout(() => r(resVal), ms));

export default delay;
