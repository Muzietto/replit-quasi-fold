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
import String from '/src/components/String';
import Boolean from '/src/components/Boolean';

export default function Traverser({
  currentValue = {},
  setCurrentValue = () => {},
  lastFocus = null,
  setLastFocus = () => {},
}) {

  console.log(JSON.stringify(currentValue));
  return <Box>
    {Object.keys(currentValue)
      .map(chiave => transformed(
        chiave,
        currentValue[chiave],
        chiave,
        (r, swapKey) => ddObject(currentValue, chiave)(r, swapKey),
        r => removed(currentValue)(r)
      ))}
  </Box>;

  function transformed(chiave, valore, path, returner, remover) {

    const depth = path.split('.').length;
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
      {isObject(valore) && <div style={{ padding: 5, marginLeft: 10 * (depth-1), marginTop: -15 }}>
        <p>{`${chiave} object`}</p>
        <div style={{ padding: 5, marginLeft: -35, marginTop: -5 }}>
          {Object.keys(valore)
            .map(chiaveInterna => transformed( // chiave, valore, returner, path, remover
              chiaveInterna,
              valore[chiaveInterna],
              `${path}.${chiaveInterna}`,
              (r, swapKey) => returner(() => {
                return ddObject(
                  valore,
                  chiaveInterna
                )(r, swapKey);
              }),
              r => returner(() => removed(valore)(r))
            ))}
          </div>
        </div>}
      {isArray(valore) && <div style={{ padding: 5, marginLeft: 10 * (depth-1), marginTop: -15 }}>
        <p>{`${chiave} array`}</p>
        <div style={{ padding: 5, marginLeft: -30, marginTop: -5 }}>
          {valore.map((val, pos) =>
            transformed( // chiave, valore, returner, path, remover
              pos,
              val,
              `${path}.${pos}`,
              r => returner(() => {
                return ddArray(
                  valore,
                  pos
                )(r);
              }),
              r => returner(() => removed(valore)(r))
            ))}
        </div>
      </div>}
      {isString(valore) && <div style={{ marginLeft: -depth, marginTop: 0 }}>
        <String 
           chiave={chiave}
           valore={valore}
           returner={returner}
           path={path}
           setCurrentValue={setCurrentValue}
           lastFocus={lastFocus}
           setLastFocus={setLastFocus}
        />
      </div>}
      {isNumber(valore) && <div style={{ marginLeft: -depth, marginTop: 0 }}>
          <String 
             chiave={chiave}
             valore={valore}
             returner={returner}
             path={path}
             setCurrentValue={setCurrentValue}
             lastFocus={lastFocus}
             setLastFocus={setLastFocus}
          />
        </div>}
      {isBoolean(valore) && <div style={{ marginLeft: -depth, marginTop: 0 }}>
        <Boolean 
           chiave={chiave}
           valore={valore}
           path={path}
           lastFocus={lastFocus}
           returner={returner}
           setCurrentValue={setCurrentValue}
           setLastFocus={setLastFocus}
        />
      </div>}
    </Flex>
  }
};
