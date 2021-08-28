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
const exampleArray = [5, 12, 51, 2, 3, 4, 56, 13];
function MergeSortVisualizer(props) {
  // const [arrayBeingSorted, setArrayBeingSorted] = useState([...props.arrayToSort]);
  const [arrayBeingSorted, setArrayBeingSorted] = useState([...props.arrayToSort]);
  const [mergeSorted, setMergeSorted] = useState([...arrayBeingSorted]);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    setArrayBeingSorted([...props.arrayToSort]);
  }, [props.arrayToSort]);

  useEffect(() => {
    setMergeSorted(exampleArray);
  }, []);

  const classes = useStyles();

  const mergeSort = arr => {
    // console.log(arr);
    let sortedArr = [];
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    setMergeSorted([...merge(left, right)]);
    sortedArr = [...merge(left, right)];
    return sortedArr;
  };

  const handleClick = () => {
    console.log(mergeSort(exampleArray));
  };

  const merge = (arr1, arr2) => {
    const mergedArray = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
      if (arr2[j] > arr1[i]) {
        mergedArray.push(arr1[i]);
        i++;
      } else {
        mergedArray.push(arr2[j]);
        j++;
      }
    }

    while (i < arr1.length) {
      mergedArray.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      mergedArray.push(arr2[j]);
      j++;
    }

    return mergedArray;
  };

  return (
    <div className={classes.root}>
      <h1>Merge Sort</h1>
      <p># of steps: {steps}</p>
      <div className={classes.sortDisplayer}>
        {mergeSorted.map((val, index) => (
          <div className={classes.bar} key={index} style={{ height: `${val}px` }}></div>
        ))}
      </div>
      <button onClick={handleClick}>Sort</button>
    </div>
  );
}

export default MergeSortVisualizer;
