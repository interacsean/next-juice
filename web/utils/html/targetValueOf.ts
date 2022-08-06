type E = {
  target: {
    value: string;
  };
};

export default function targetValueOf<R>(handler: (val: string) => R) {
  return (e: E) => handler(e.target.value);
}
