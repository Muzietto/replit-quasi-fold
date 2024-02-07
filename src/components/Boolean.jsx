import React from 'react';
import { 
  Radio, 
  FormLabel, 
  Flex, 
  TextInput,
} from '@contentful/f36-components';

export default function Boolean({
  chiave = '',
  valore = false,
  path = '',
  lastFocus = '',
  returner = () => {},
  setCurrentValue = () => {},
  setLastFocus = () => {},
}) {
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
        id={false}
        isChecked={!valore}
        labelText='falso'
        style={{ marginRight: 8 }}
        onChange={() => { setCurrentValue(returner(() => false)); setLastFocus(''); }}
      />
      <Radio
        id={true}
        isChecked={valore}
        labelText='vero'
        onChange={() => { setCurrentValue(returner(() => true)); setLastFocus(''); }}
      />
      <FormLabel style={{ marginLeft: '10px' }}>vero</FormLabel>
    </Flex>
  </Flex>;
}