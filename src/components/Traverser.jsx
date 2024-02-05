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

export default function Traverser({
  currentValue = {},
  setCurrentValue = () => {}
}) {

  console.log(JSON.stringify(currentValue));;
  return <Box>

    {Object.keys(currentValue)
      .map(chiave => transformed(
        chiave,
        currentValue[chiave],
        r => xxx(currentValue, chiave)(r)
      ))}
  </Box>;

  function transformed(chiave, valore, returner) {
    console.log('transforming', chiave, valore);
    return <Box key={`naww_${Math.random()}`} style={{ padding: 5, marginLeft: 10 }}>
      {isString(valore) && <Flex style={{ height: 30 }} alignItems='center'>
        <p style={{ marginRight: 10 }}>{`${chiave}`}</p>
        <TextInput
          value={valore}
          style={{ height: 15 }}
          onChange={ev => {
            const newCurrentValue = returner(() => ev.target.value);
            console.log('nCV', JSON.stringify(newCurrentValue));
            setCurrentValue(newCurrentValue);
          }}
        />
      </Flex>}
      {isArray(valore) && <>
        <p>{`${chiave} array`}</p>
        {valore.map((val, pos) =>
          transformed( // chiave, valore, returner
            (isObject(val) || isArray(val))
              ? pos
              : pos,
            val,
            r => returner(() => {
              return aaa2(
                valore,
                pos
              )(r);
            }),
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
