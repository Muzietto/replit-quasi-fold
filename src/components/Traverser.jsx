import React from 'react';
import traverser, { subtract } from '/src/model/traverser/traverser';


function Traverser() {
  return (
    <div>
      <p>ciao mamma: 12 + 23 =</p>
      {traverser.add(12,23)}
      <p>ciao mamma: 12 - 23 =</p>
      {subtract(12,23)}
</div>
  );
}

export default Traverser;