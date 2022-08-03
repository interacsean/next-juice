function orUndefined<X>(expr: X | 0 | false | null | undefined): X | undefined {
  return expr || undefined;
}

export default orUndefined;
