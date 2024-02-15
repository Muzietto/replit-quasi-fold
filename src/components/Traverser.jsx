import React from 'react';
import {
  Box,
  IconButton,
  Flex,
  Tooltip,
} from '@contentful/f36-components';
import { CloseIcon } from '@contentful/f36-icons';
import 
  {
    ddObject,
    ddArray,
    removed,
    isString,
    isArray,
    isObject,
    isBoolean,
    isNumber,
  } from '/src/model/traverser/traverser';
import Leaf from '/src/components/Leaf';
import Node from '/src/components/Node';

export default function Traverser({
  currentValue = null,
  setCurrentValue = () => {},
  lastFocus = null,
  setLastFocus = () => {},
}) {

  console.log(JSON.stringify(currentValue));
  return <Box>
    {currentValue && isObject(currentValue)
    && Object.keys(currentValue)
      .map(chiave => <Transformed
        key={`MainJSObject_${Math.random()}`}
        chiave={chiave}
        valore={currentValue[chiave]}
        path={chiave}
        returner={(r, swapKey) => ddObject(currentValue, chiave)(r, swapKey)}
        remover={r => removed(currentValue)(r)}
        setCurrentValue={setCurrentValue}
        lastFocus={lastFocus}
        setLastFocus={setLastFocus}
    />)}
    {currentValue && isArray(currentValue)
    && currentValue
      .map((val, pos) => <Transformed
        key={`MainJSArray_${Math.random()}`}
        chiave={pos}
        valore={val}
        path={pos}
        returner={r => ddArray(currentValue, pos)(r)}
        remover={r => removed(currentValue)(r)}
        setCurrentValue={setCurrentValue}
        lastFocus={lastFocus}
        setLastFocus={setLastFocus}
    />)}
  </Box>;
};

export function Transformed({
    chiave = '',
    valore = null,
    path = '',
    returner = () => {},
    remover = () => {},
    setCurrentValue = () => {},
    lastFocus = () => {},
    setLastFocus = () => {},
  }) {

  const depth = `${path}`.split('.').length;
  return <Flex key={`naww_${Math.random()}`} style={{ padding: 5, marginLeft: 10 }}>
    <Tooltip placement='top' content='DELETE'>
      <IconButton
        variant='transparent'
        style={{
          top: '1px',
          right: '1px',
          padding: '0.25rem',
          height: '38px',
          zIndex: 1,
        }}
        onClick={() => {
          console.log('### removing ###', chiave, depth);
          const newCurrentValue = remover(() => chiave);
          console.log('nCV=', newCurrentValue);
          setCurrentValue(newCurrentValue);
        }}
        icon={<CloseIcon />}
        size='small'
      />
    </Tooltip>
    {!isBoolean(valore) 
      && (isArray(valore)
        || isObject(valore))
      && <Node
        chiave={chiave}
        valore={valore}
        path={path}
        returner={returner}
        setCurrentValue={setCurrentValue}
        lastFocus={lastFocus}
        setLastFocus={setLastFocus}
    />}
    {(isString(valore) // cannot check valore because value can be false
        || isBoolean(valore) 
        || isNumber(valore))
      && <Leaf 
        chiave={chiave}
        valore={valore}
        path={path}
        returner={returner}
        setCurrentValue={setCurrentValue}
        lastFocus={lastFocus}
        setLastFocus={setLastFocus}
    />}
  </Flex>
}
  