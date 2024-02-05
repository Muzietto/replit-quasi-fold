import React from 'react';
import {
  Box,
  TextInput,
  Flex,
  Checkbox,
  Button,
} from '@contentful/f36-components';
import 
  { 
    xxx,
    yyy,
    aaa2,
    isString,
    isArray,
    isObject,
    isBoolean,
    isNumber,
  } from '/src/model/traverser/traverser';
import String from '/src/components/String';

export default function Traverser({
  currentValue = {},
  setCurrentValue = () => {},
  lastFocus = null,
  setLastFocus = () => {},
}) {

  console.log(JSON.stringify(currentValue));;
  return <Box>

    {Object.keys(currentValue)
      .map(chiave => transformed(
        chiave,
        currentValue[chiave],
        r => xxx(currentValue, chiave)(r),
        chiave
      ))}
  </Box>;

  function transformed(chiave, valore, returner, path) {
    console.log('transforming', chiave, valore);
    return <Box key={`naww_${Math.random()}`} style={{ padding: 5, marginLeft: 10 }}>
      {isString(valore) && <String 
         chiave={chiave}
         valore={valore}
         returner={returner}
         path={path}
         setCurrentValue={setCurrentValue}
         lastFocus={lastFocus}
         setLastFocus={setLastFocus}
      />}
      {isArray(valore) && <>
        <p>{`${chiave} array`}</p>
        {valore.map((val, pos) =>
          transformed( // chiave, valore, returner
            pos,
            val,
            r => returner(() => {
              return aaa2(
                valore,
                pos
              )(r);
            }),
            `${path}.${pos}`
          ))}
      </>}
      {isObject(valore) && <div style={{ padding: 5, marginLeft: 0 }}>
        <p>{`${chiave} object`}</p>
        {Object.keys(valore)
          .map(chiaveInterna => transformed(
            chiaveInterna,
            valore[chiaveInterna],
            r => returner(() => {
              return xxx(
                valore,
                chiaveInterna
              )(r);
            }),
            `${path}.${chiaveInterna}`
          ))}
      </div>}
      {/*isNumber(valore) && <Flex style={{ height: 30 }} alignItems='center'>
        <p style={{ marginRight: 10 }}>{`${chiave}:`}</p>
        <TextInput
          value={valore}
          style={{ height: 15 }}
          onChange={() => { }}
        />
      </Flex>}
      {isBoolean(valore) && <Flex flexDirection='row'>
        <p style={{ marginRight: 10 }}>{context}</p>
        <Checkbox
          isChecked={valore}
          onChange={() => { }}
        />
      </Flex>*/}
    </Box>
  }
};
