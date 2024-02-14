import '/src/App.css';
import React, { useState } from 'react';
import Traverser from '/src/components/Traverser';

export default function App() {
  const [currentValue, setCurrentValue] = useState({
    wtrue:true,
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
