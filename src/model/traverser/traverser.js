// drilldown in array
export function aaa2(ctx, pos) {
  // console.log('aaa2', ctx, pos);
  return visitor => [
    ...ctx.slice(0, pos),
    visitor(),
    ...ctx.slice(pos + 1)
  ];
}

// drilldown in object
export function xxx(ctx, key) {
  return visitor => ({
    ...ctx,
    [key]: visitor(),
  });
}

// substitute in dictionary
export function yyy(ctx, key, value) {
  return {
    ...ctx,
    [key]: value,
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
