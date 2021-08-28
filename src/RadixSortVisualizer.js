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

function RadixSortVisualizer(props) {
  const [arrayBeingSorted, setArrayBeingSorted] = useState([...props.arrayToSort]);
  const [steps, setSteps] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    setArrayBeingSorted([...props.arrayToSort]);
  }, [props.arrayToSort]);

  const radixSort = async arr => {
    console.log('start', arr);
    let maxDigitCount = mostDigits(arr);
    for (let k = 0; k < maxDigitCount; k++) {
      let digitBuckets = Array.from({ length: 10 }, () => []);
      for (let i = 0; i < arr.length; i++) {
        //digitBuckets[getDigit(arr[i], k)].push(arr[i])
        let digit = getDigit(arr[i], k);
        digitBuckets[digit].push(arr[i]);
      }
      arr = [].concat(...digitBuckets);
      console.log(arr);
      setArrayBeingSorted([...arr]);
      await timer(2000);
    }
    return arr;
  };

  const getDigit = (num, i) => {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
  };

  const digitCount = num => {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  };

  const mostDigits = arr => {
    let maxDigits = 0;
    for (let i = 0; i < arr.length; i++) {
      maxDigits = Math.max(maxDigits, digitCount(arr[i]));
    }
    return maxDigits;
  };

  const handleClick = () => {
    radixSort(arrayBeingSorted);
  };
  return (
    <div className={classes.root}>
      <h1>Radix Sort</h1>
      {/* <p># of steps: {steps}</p> */}
      <div className={classes.sortDisplayer}>
        {arrayBeingSorted.map((val, index) => (
          <div className={classes.bar} key={index} style={{ height: `${val}px` }}></div>
        ))}
      </div>
      <button onClick={handleClick}>Sort</button>
    </div>
  );
}

export default RadixSortVisualizer;
