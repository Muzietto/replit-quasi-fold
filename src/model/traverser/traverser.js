// drilldown in array
export function ddArray(ctx, pos) {
  // console.log('aaa2', ctx, pos);
  return visitor => [
    ...ctx.slice(0, pos),
    visitor(),
    ...ctx.slice(pos + 1)
  ];
}

export function removed(ctx) {
  return keyF => {
    const key = keyF();
    if (ctx.length && ctx.slice) {
      console.log('removing from array');
      return [...ctx.slice(0, key), ...ctx.slice(key + 1)];
    }
    console.log('removing from object');
    return Object.keys(ctx).reduce(
      (acc, curr) =>
        (curr !== key)
          ? { ...acc, [curr]: ctx[curr] }
          : acc,
      {},
    );
    }
}

// drilldown in object
export function ddObject(ctx, key) {
  return (visitor, swapKey) => {
    // console.log('swapKey=', !!swapKey);
    return !swapKey
      ? {
          ...ctx,
          [key]: visitor(),
        }
      : Object.keys(ctx).reduce(
      (acc, curr) =>
        curr !== key
          ? { ...acc, [curr]: ctx[curr] }
          : { ...acc, [visitor()]: ctx[key] },
      {},
    );
  };
}

export function isObject(valore) {
  return (typeof valore === 'object') && !Array.isArray(valore);
}
export function isArray(valore) {
  return Array.isArray(valore);
}
export function isBoolean(valore) {
  return (typeof valore === 'boolean');
}
export function isString(valore) {
  return typeof valore === 'string';
}
export function isNumber(valore) {
  return typeof valore === 'number';
}
