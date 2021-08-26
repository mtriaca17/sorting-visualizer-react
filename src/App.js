import React from 'react';
import BubbleSortVisualizer from './BubbleSortVisualizer';
import SelectionSortVisualizer from './SelectionSortVisualizer';
import InsertionSortVisualizer from './InsertionSortVisualizer';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Sorting visualizer</h1>
      <button>Generate New Array</button>
      <BubbleSortVisualizer />
      <SelectionSortVisualizer />
      <InsertionSortVisualizer />
    </div>
  );
}

export default App;
