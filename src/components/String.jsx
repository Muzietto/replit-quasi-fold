import React, { useRef } from 'react';
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

  return <Flex style={{ height: 30 }} alignItems='center'>
      <p style={{ marginRight: 10 }}>{`${chiave}`}</p>
      <TextInput
        ref={inputRef => {
          if (inputRef != null && path !== '' && path === lastFocus) {
            inputRef.focus();
            inputRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        value={valore}
        style={{ height: 15 }}
        onChange={ev => {
          const newCurrentValue = returner(() => ev.target.value);
          //console.log('nCV', JSON.stringify(newCurrentValue));
          setCurrentValue(newCurrentValue);
          setLastFocus(path);
        }}
      />
    </Flex>;
};
