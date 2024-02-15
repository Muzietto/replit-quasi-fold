import '/src/App.css';
import React, { useState } from 'react';
import Traverser from '/src/components/Traverser';

export default function App() {
  const [currentValue, setCurrentValue] = useState({
    "ciao": "qwer",
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
      <pre>{JSON.stringify(currentValue, null,2)}</pre>
    </main>
  );
}
