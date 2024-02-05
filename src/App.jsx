import '/src/App.css';
import React, { useState } from 'react';
import Traverser from '/src/components/Traverser';

export default function App() {

  const [currentValue, setCurrentValue] = useState({
    key1: 'val1',
    key2: [
      'ciao',
      'mamma',
      {
        gino: 'latilla',
        pino: [
          'grovio'
        ],
      }
    ],
    key3: 'val3',
    key31: 'val31',
    key312: 'val312',
});

  console.log('cV', JSON.stringify(currentValue));
  
  return <main>
      <Traverser
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
      />
    </main>
}
