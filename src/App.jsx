import '/src/App.css';
import React, { useState } from 'react';
import Traverser from '/src/components/Traverser';

export default function App() {
  const [currentValue, setCurrentValue] = useState({
    key1: true,
    key11: [
      false,
      'ciao',
      {
        123:123,
        wer:true,
      },
    ],
    ciao: {
      fir: 123,
      dfg: true,
      qwe:'123',
      ert:123,
    },
  });

  const [lastFocus, setLastFocus] = useState('');

  return (
    <main>
      <Traverser
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
        lastFocus={lastFocus}
        setLastFocus={setLastFocus}
      />
    </main>
  );
}
