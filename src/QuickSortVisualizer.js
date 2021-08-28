import React, { useState, useEffect } from 'react';
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

const timer = ms => new Promise(res => setTimeout(res, ms));

function QuickSortVisualizer(props) {
  // const toSrt = [...props.arrayToSort];
  const [steps, setSteps] = useState(0);
  const [arrayBeingSorted, setArrayBeingSorted] = useState([...props.arrayToSort]);
  const [arrPivot, setArrPivot] = useState(0);

  useEffect(() => {
    setArrayBeingSorted([...props.arrayToSort]);
    setArrPivot(0);
  }, [props.arrayToSort]);

  const quickSort = async (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
      let pivotIndex = await pivot(arr, left, right);
      //leftside
      quickSort(arr, left, pivotIndex - 1);
      //rightside
      quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
  };

  async function pivot(arr, start = 0, end = arr.length + 1) {
    let pivot = arr[start];
    setArrPivot(start);

    let swapIdx = start;
    for (let i = start + 1; i < arr.length; i++) {
      if (pivot > arr[i]) {
        swapIdx++;
        [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];
      }
    }
    [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
    await timer(50);
    console.log(arr);
    setArrayBeingSorted([...arr]);
    setSteps(prevState => (prevState += 1));

    return swapIdx;
  }

  const handleClick = () => {
    console.log(arrayBeingSorted);
    quickSort(arrayBeingSorted);
    console.log(arrayBeingSorted);
    // console.log('!!!!', arrayToSort);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Quick Sort</h1>
      <p># of steps: {steps}</p>
      <div className={classes.sortDisplayer}>
        {arrayBeingSorted.map((val, index) => (
          <div
            className={classes.bar}
            key={index}
            style={{
              height: `${val}px`,
              backgroundColor: index === arrPivot ? 'red' : 'dodgerblue',
            }}
          ></div>
        ))}
      </div>
      <button onClick={handleClick}>Sort</button>
    </div>
  );
}

export default QuickSortVisualizer;
