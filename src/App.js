import React, { useState, useEffect } from 'react';
import BubbleSortVisualizer from './BubbleSortVisualizer';
import SelectionSortVisualizer from './SelectionSortVisualizer';
import InsertionSortVisualizer from './InsertionSortVisualizer';
import { createUseStyles } from 'react-jss';

// import './App.css';
const useStyles = createUseStyles({
  App: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  AppTitle: {},
  newBtn: {
    padding: '1rem',
    cursor: 'pointer',
  },
});

const generateArray = (length = 50) => {
  return Array.from({ length: length }, () => Math.floor(Math.random() * 100) + 1);
};

// const exampleArray = [4, 2, 1, 5, 3, 9, 2, 3, 12, 5, 6, 9, 2, 4, 7, 8, 12, 5, 4, 12, 13];
function App() {
  const [arrToSort, setArrToSort] = useState([]);

  useEffect(() => {
    console.log('h1');
    setArrToSort([...generateArray()]);
  }, []);

  const onClick = () => {
    setArrToSort(generateArray());
  };

  const classes = useStyles();

  return (
    <div className={classes.App}>
      <h1 className={classes.AppTitle}>Sorting visualizer</h1>
      <button className={classes.newBtn} onClick={onClick}>
        Generate New Array
      </button>
      <BubbleSortVisualizer arrayToSort={arrToSort} />
      <SelectionSortVisualizer arrayToSort={arrToSort} />
      <InsertionSortVisualizer arrayToSort={arrToSort} />
    </div>
  );
}

export default App;
