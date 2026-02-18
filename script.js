let array = [];

function generateArray() {
  array = [];
  document.getElementById("array-container").innerHTML = "";

  for (let i = 0; i < 20; i++) {
    let value = Math.floor(Math.random() * 100) + 10;
    array.push(value);

    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";

    document.getElementById("array-container").appendChild(bar);
  }
}

async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {

      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      await sleep(100);

      if (array[j] > array[j + 1]) {
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
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}