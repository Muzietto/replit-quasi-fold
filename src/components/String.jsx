import React from 'react';
import {
  TextInput,
  Flex,
} from '@contentful/f36-components';

export default function String({
  chiave = '',
  valore = '',
  returner = () => {},
  path = '',
  setCurrentValue = () => {},
  lastFocus = '',
  setLastFocus = () => {},
}) {

  // console.log('lastFocus', lastFocus);

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
};
