import React from 'react';
import {
  isArray,
  isObject,
  ddObject,
  ddArray,
  removed,
} from '/src/model/traverser/traverser';
import { Transformed } from '/src/components/Traverser';

export default function Node({
  chiave = '',
  valore = null,
  path = '',
  returner = () => {},
  setCurrentValue = () => {},
  lastFocus = '',
  setLastFocus = () => {},
  }) {
  
  const depth = `${path}`.split('.').length - 1;
  
  return <>
    {valore && isObject(valore) 
      && <JSObject
       chiave={chiave}
       valore={valore}
       path={path}
       returner={returner}
       setCurrentValue={setCurrentValue}
       lastFocus={lastFocus}
       setLastFocus={setLastFocus}
    />}
    {valore && isArray(valore) 
      && <JSArray
       chiave={chiave}
       valore={valore}
       path={path}
       returner={returner}
       setCurrentValue={setCurrentValue}
       lastFocus={lastFocus}
       setLastFocus={setLastFocus}
    />}
  </>;
}

function JSObject({
   chiave = '',
   valore = {},
   returner = () => {},
   path = '',
   setCurrentValue = () => {},
   lastFocus = '',
   setLastFocus = () => {},
  }) {

  const depth = `${path}`.split('.').length - 1;

  return <div style={{ padding: 5, marginLeft: 10 * (depth-1), marginTop: -15 }}>
    <p>{`${chiave} object`}</p>
    <div style={{ padding: 5, marginLeft: -35, marginTop: -5 }}>
      {Object.keys(valore)
        .map(chiaveInterna => <Transformed
          key={`JSObject_${Math.random()}`}
          chiave={chiaveInterna}
          valore={valore[chiaveInterna]}
          path={`${path}.${chiaveInterna}`}
          returner={(r, swapKey) => returner(() => {
            return ddObject(
              valore,
              chiaveInterna
            )(r, swapKey);
          })}
          remover={r => returner(() => removed(valore)(r))}
          setCurrentValue={setCurrentValue}
          lastFocus={lastFocus}
          setLastFocus={setLastFocus}
        />)}
      </div>
    </div>;
}

function JSArray({
  chiave = '',
  valore = [],
  path = '',
  returner = () => {},
  setCurrentValue = () => {},
  lastFocus = '',
  setLastFocus = () => {},
}) {

  const depth = `${path}`.split('.').length - 1;

  return <div style={{ padding: 5, marginLeft: 10 * (depth-1), marginTop: -15 }}>
    <p>{`${chiave} array`}</p>
    <div style={{ padding: 5, marginLeft: -30, marginTop: -5 }}>
      {valore.map((val, pos) =>
        <Transformed
          key={`JSArray_${Math.random()}`}
          chiave={pos}
          valore={val}
          path={`${path}.${pos}`}
          returner={r => returner(() => {
            return ddArray(
              valore,
              pos
            )(r);
          })}
          remover={r => returner(() => removed(valore)(r))}
          setCurrentValue={setCurrentValue}
          lastFocus={lastFocus}
          setLastFocus={setLastFocus}
        />)}
    </div>
  </div>;
}
