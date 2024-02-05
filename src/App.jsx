import '/src/App.css';
import React, { useState } from 'react';
import Traverser from '/src/components/Traverser';

export default function App() {

  const [currentValue, setCurrentValue] = useState({
    key1: 'val1',
    key11: 'val11',
    ciao: {
      fir: '123',
      vog: [
        "qwsjfokd",
        [
        'wer',
        '234234',
        ]
      ],
    }
  });

  const [lastFocus, setLastFocus] = useState('');

  // console.log('cV', JSON.stringify(currentValue));
  
  return <main>
      <Traverser
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
        lastFocus={lastFocus}
        setLastFocus={setLastFocus}
      />
    </main>
}
