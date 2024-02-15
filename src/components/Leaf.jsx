import React from 'react';
import {
  TextInput,
  Flex,
  Radio, 
  FormLabel, 
} from '@contentful/f36-components';
import {
  isString,
  isBoolean,
  isNumber,
} from '/src/model/traverser/traverser';

export default function Leaf({
  chiave = '',
  valore = '',
  returner = () => {},
  path = '',
  setCurrentValue = () => {},
  lastFocus = '',
  setLastFocus = () => {},
}) {
  console.log('LEAF', chiave, valore);
  const depth = `${path}`.split('.').length - 1;
  
  return <>
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
</>
}

function String({
  chiave = '',
  valore = '',
  returner = () => {},
  path = '',
  setCurrentValue = () => {},
  lastFocus = '',
  setLastFocus = () => {},
}) {
  console.log('STRING, valore =', valore);
  return <Flex style={{ height: 30 }} alignItems='center'>
      <div>
      {(![...Array(101).keys()].includes(chiave))
        ? <TextInput
            id={`${path}_key`}
            ref={inputRef => {
              if (inputRef !== null && path !== '' && `${path}_key` === lastFocus) {
                inputRef.focus();
                inputRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            value={chiave} 
            onChange={ev => {
              const newCurrentValue = returner(() => ev.target.value, true);
              setCurrentValue(newCurrentValue);
              const parentPath = path.split('.').reverse().slice(1).reverse().join('.');
              setLastFocus(`${parentPath}${(parentPath) ? '.' : ''}${ev.target.value}_key`);
            }}
          />
        : <p style={{ marginRight: 10 }}>{`${chiave}`}</p>
      }
      </div>
      <TextInput
        id={`${path}_value`}
        ref={inputRef => {
          if (inputRef !== null && path !== '' && `${path}_value` === lastFocus) {
            inputRef.focus();
            inputRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        value={valore}
        style={{ height: 15 }}
        onChange={ev => {
          const newCurrentValue = returner(() => ev.target.value);
          setCurrentValue(newCurrentValue);
          setLastFocus(`${path}_value`);
        }}
      />
    </Flex>;
}

function Boolean({
  chiave = '',
  valore = false,
  path = '',
  returner = () => {},
  lastFocus = '',
  setCurrentValue = () => {},
  setLastFocus = () => {},
}) {
  console.log('BOOLEAN');
  console.log(`chiave = ${chiave}`);
  console.log(`valore = ${valore}`);
  console.log(`path = ${path}`);
  console.log(`lastFocus = ${lastFocus}`);
  console.log(`returner = ${returner}`);
  console.log(`setCurrentValue = ${setCurrentValue}`);
  console.log(`setLastFocus = ${setLastFocus}`);

  return <Flex style={{ height: 35 }} alignItems='center'>
    {(![...Array(101).keys()].includes(chiave))
      ? <TextInput
          id={`${path}_key`}
          ref={inputRef => {
            if (inputRef !== null && path !== '' && `${path}_key` === lastFocus) {
              inputRef.focus();
              inputRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          value={chiave} 
          onChange={ev => {
            const newCurrentValue = returner(() => ev.target.value, true);
            setCurrentValue(newCurrentValue);
            const parentPath = path.split('.').reverse().slice(1).reverse().join('.');
            setLastFocus(`${parentPath}${(parentPath) ? '.' : ''}${ev.target.value}_key`);
          }}
      />
      : <p style={{ marginRight: 10 }}>{`${chiave}`}</p>
    }
    <Flex justifyContent='center' style={{ marginTop: 8 }}>
      <FormLabel style={{ marginRight: '10px' }}>falso</FormLabel>
      <Radio
        id={`${path}_false`}
        isChecked={!valore}
        style={{ marginRight: 8 }}
        onChange={() => { setCurrentValue(returner(() => false)); setLastFocus(''); }}
      />
      <Radio
        id={`${path}_true`}
        isChecked={valore}
        onChange={() => { setCurrentValue(returner(() => true)); setLastFocus(''); }}
      />
      <FormLabel style={{ marginLeft: '10px' }}>vero</FormLabel>
    </Flex>
  </Flex>;
}