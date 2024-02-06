import React from 'react';
import { Radio, FormLabel, Flex } from '@contentful/f36-components';

export default function Boolean({
  chiave = '',
  valore = false,
  returner = () => {},
  setCurrentValue = () => {}
}) {
  return <Flex style={{ height: 35 }} alignItems='center'>
      <p style={{ marginRight: 10 }}>{`${chiave}`}</p>
    <Flex justifyContent='center' style={{ marginTop: 8 }}>
      <FormLabel style={{ marginRight: '10px' }}>falso</FormLabel>
      <Radio
        id={false}
        isChecked={!valore}
        labelText='falso'
        style={{ marginRight: 8 }}
        onChange={() => { setCurrentValue(returner(() => false)); }}
      />
      <Radio
        id={true}
        isChecked={valore}
        labelText='vero'
        onChange={() => { setCurrentValue(returner(() => true)); }}
      />
      <FormLabel style={{ marginLeft: '10px' }}>vero</FormLabel>
    </Flex>
  </Flex>;
}