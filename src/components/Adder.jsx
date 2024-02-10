import React from 'react';
import {
  Stack,
  Collapse,
  Text,
  Button,
  Flex,
} from '@contentful/f36-components';

export default function Adder({
  adderExpanded = false,
  setAdderExpanded = () => {},
}) {
  return <Stack flexDirection='column'>
      <Collapse 
        isExpanded={adderExpanded}
        style={{
          margin: 8,
          padding: 5,
          border: '1px solid #e0e0e0',
          borderRadius: 3,
        }}
      ><Flex flexDirection='row' fullWidth>

        <Text>
          Customers on the Team tier can pay with a credit card (American
          Express, MasterCard or Visa). Enterprise customers have the choice of
          paying with a credit card or wire transfer.
        </Text>
        <Button>Add</Button>
        <Button
          onClick={() => { setAdderExpanded(false); }}>Cancel</Button>
        </Flex>
      </Collapse>
    </Stack>
  ;
}