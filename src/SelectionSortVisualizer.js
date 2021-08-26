import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortDisplayer: {
    width: '90%',
    height: '60%',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '1px',
  },
  bar: {
    border: '1px solid black',
    width: '10px',
    backgroundColor: 'dodgerblue',
  },
});

const exampleArray = [4, 2, 1, 5, 3, 9, 2, 3, 12, 5, 6, 9, 2, 4, 7, 8, 12, 5, 4, 12, 13];
// const exampleArray = [3, 12, 5, 6, 9, 2, 4, 7, 8, 12, 5, 4, 12, 13, 4, 2, 1, 5, 3, 9, 2];
const timer = ms => new Promise(res => setTimeout(res, ms));

function SelectionSortVisualizer() {
  const [arrToSort, setArrToSort] = useState(exampleArray);
  const classes = useStyles();

  const selectionSort = async arr => {
    for (let i = 0; i < arr.length; i++) {
      let lowest = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[lowest]) {
          lowest = j;
        }
      }
      if (i !== lowest) {
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
        setArrToSort([...arr]);
        await timer(300);
      }
    }
    console.log(arr);
    return arr;
  };

  const handleClick = () => {
    selectionSort(arrToSort);
  };
  return (
    <div className={classes.root}>
      <h1>Selection Sort</h1>
      <div className={classes.sortDisplayer}>
        {arrToSort.map((val, index) => (
          <div className={classes.bar} key={index} style={{ height: `${val * 30}px` }}></div>
        ))}
      </div>
      <button onClick={handleClick}>Sort</button>
    </div>
  );
}

export default SelectionSortVisualizer;
