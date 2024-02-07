import '/src/App.css';
import React, { useState } from 'react';
import Traverser from '/src/components/Traverser';

export default function App() {
  const [currentValue, setCurrentValue] = useState({
      qwe: '123',
      ert: true,
    fgh: [
      'gino',
      true,
      {
        qwe: 123,
        sgsgsgs: false,
      },
    ],
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
