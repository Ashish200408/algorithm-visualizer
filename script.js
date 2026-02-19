let comparisons = 0;
let swaps = 0;

function resetStats() {
  comparisons = 0;
  swaps = 0;
  document.getElementById("comparisons").innerText = comparisons;
  document.getElementById("swaps").innerText = swaps;
}

function updateStats() {
  document.getElementById("comparisons").innerText = comparisons;
  document.getElementById("swaps").innerText = swaps;
}

let arraySize = 20;

document.getElementById("sizeSlider").addEventListener("input", function () {
  arraySize = this.value;
  document.getElementById("sizeValue").innerText = arraySize;
  generateArray();
});

let speed = 100;

document.getElementById("speedSlider").addEventListener("input", function () {
  speed = this.value;
document.getElementById("speedValue").innerText = speed + " ms";
});

let array = [];

const notesData = {
  bubble: `
    <p>
      <b>Bubble Sort:</b> Compares adjacent elements and swaps them if needed.<br>
      <b>Time:</b> O(n²) | <b>Space:</b> O(1)
    </p>
  `,
  selection: `
    <p>
      <b>Selection Sort:</b> Finds the smallest element and places it at the beginning.<br>
      <b>Time:</b> O(n²) | <b>Space:</b> O(1)
    </p>
  `,
  merge: `
    <p>
      <b>Merge Sort:</b> Divides the array, sorts recursively, and merges results.<br>
      <b>Time:</b> O(n log n) | <b>Space:</b> O(n)
    </p>
  `,
  linear: `
    <p>
      <b>Linear Search:</b> Checks each element one by one until the value is found.<br>
      <b>Time:</b> O(n) | <b>Space:</b> O(1)
    </p>
  `,
  binary: `
    <p>
      <b>Binary Search:</b> Repeatedly divides the search space in half.<br>
      <b>Requirement:</b> Array must be sorted<br>
      <b>Time:</b> O(log n) | <b>Space:</b> O(1)
    </p>
  `
};
function updateNotes(type) {
  document.getElementById("notes").innerHTML = notesData[type];
}

function disableControls(disabled) {
  document.querySelectorAll("button, input").forEach(el => {
    el.disabled = disabled;
  });
}

function generateArray() {
  array = [];
  document.getElementById("array-container").innerHTML = "";

  for (let i = 0; i < arraySize; i++) {
    let value = Math.floor(Math.random() * 50) + 1;
    array.push(value);

    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";

    document.getElementById("array-container").appendChild(bar);
  }
}

async function bubbleSort() {
  disableControls(true);
  updateNotes("bubble");
  resetStats();

  let bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {

      comparisons++;
      updateStats();

      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      await sleep();

      if (array[j] > array[j + 1]) {

        swaps++;
        updateStats();

        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        bars[j].style.height = array[j] + "px";
        bars[j + 1].style.height = array[j + 1] + "px";
      }

      bars[j].style.backgroundColor = "steelblue";
      bars[j + 1].style.backgroundColor = "steelblue";
    }
  }

  disableControls(false);
}

function sleep() {
  return new Promise(resolve => setTimeout(resolve, speed));
}

async function selectionSort() {
  disableControls(true);
  updateNotes("selection");
  resetStats();

  let bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = "gold"; 

    for (let j = i + 1; j < array.length; j++) {

      comparisons++;
      updateStats();

      bars[j].style.backgroundColor = "red";
      await sleep();

      if (array[j] < array[minIndex]) {
        bars[minIndex].style.backgroundColor = "steelblue";
        minIndex = j;
        bars[minIndex].style.backgroundColor = "gold"; 
      } else {
        bars[j].style.backgroundColor = "steelblue";
      }
    }

    if (minIndex !== i) {
      swaps++;
      updateStats();

      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      bars[i].style.height = array[i] + "px";
      bars[minIndex].style.height = array[minIndex] + "px";
    }

    bars[minIndex].style.backgroundColor = "steelblue";
  }

  disableControls(false);
}

async function startMergeSort() {
  disableControls(true);
  updateNotes("merge");
  resetStats();
  let animations = [];
  let tempArray = array.slice();
  mergeSort(tempArray, 0, tempArray.length - 1, animations);
  await playMergeAnimations(animations);
  disableControls(false);
}

function mergeSort(arr, left, right, animations) {
  if (left >= right) return;

  let mid = Math.floor((left + right) / 2);

  mergeSort(arr, left, mid, animations);
  mergeSort(arr, mid + 1, right, animations);

  merge(arr, left, mid, right, animations);
}

function merge(arr, left, mid, right, animations) {
  let temp = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {

    comparisons++;
    updateStats();

    if (arr[i] <= arr[j]) {
      temp.push(arr[i]);
      i++;
    } else {
      temp.push(arr[j]);
      j++;
    }
  }

  while (i <= mid) {
    temp.push(arr[i]);
    i++;
  }

  while (j <= right) {
    temp.push(arr[j]);
    j++;
  }

  for (let k = 0; k < temp.length; k++) {
    arr[left + k] = temp[k];
    animations.push({
      index: left + k,
      value: temp[k]
    });
  }
}

async function playMergeAnimations(animations) {
  let bars = document.getElementsByClassName("bar");

  for (let step of animations) {
    let bar = bars[step.index];
    bar.style.backgroundColor = "red";

    await sleep();

    bar.style.height = step.value + "px";
    bar.style.backgroundColor = "steelblue";
  }
  array = array.slice().sort((a, b) => a - b);
}

async function linearSearch() {
  disableControls(true);
  updateNotes("linear");
  resetStats();

  let bars = document.getElementsByClassName("bar");
  let target = Number(document.getElementById("searchValue").value);

  if (isNaN(target)) {
    alert("Enter a valid number");
    disableControls(false);
    return;
  }

  for (let i = 0; i < array.length; i++) {

    comparisons++;
    updateStats();

    bars[i].style.backgroundColor = "red";
    await sleep();

    if (array[i] === target) {
      bars[i].style.backgroundColor = "green";
      alert("Found at index " + i);
      disableControls(false);
      return;
    }

    bars[i].style.backgroundColor = "steelblue";
  }

  alert("Value not found");
  disableControls(false);
}

async function binarySearch() {
  disableControls(true);
  updateNotes("binary");
  resetStats();

  let bars = document.getElementsByClassName("bar");
  let target = Number(document.getElementById("searchValue").value);

  if (isNaN(target)) {
    alert("Enter a number to search");
    disableControls(false);
    return;
  }

  array.sort((a, b) => a - b);
  for (let i = 0; i < array.length; i++) {
    bars[i].style.height = array[i] + "px";
    bars[i].style.backgroundColor = "steelblue";
  }

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    comparisons++;
    updateStats();

    bars[mid].style.backgroundColor = "red";
    await sleep();

    if (array[mid] === target) {
      bars[mid].style.backgroundColor = "green";
      alert("Found at index " + mid);
      disableControls(false);
      return;
    }

    bars[mid].style.backgroundColor = "steelblue";

    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  alert("Value not found");
  disableControls(false);
}