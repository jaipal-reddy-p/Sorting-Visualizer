// script.js
document.getElementById('run-code').addEventListener('click', () => {
  const code = document.getElementById('code').value;
  const language = document.getElementById('language').value;
  const algorithm = document.getElementById('algorithm').value;
  executeCodeAndShowOutput(code, language, algorithm);
});

document.getElementById('logout-button').addEventListener('click', () => {
  window.location.href = 'index.html'; // Navigate to the home page
});

function executeCodeAndShowOutput(code, language, algorithm) {
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = ''; // Clear previous output

  // Mock function to simulate code execution based on language
  setTimeout(() => {
    const mockOutput = executeCode(code, language);
    outputElement.innerHTML = `<pre>${mockOutput}</pre>`;
    visualizeAlgorithm(algorithm);
  }, 1000);
}

function executeCode(code, language) {
  // Mock execution of code. Replace with actual API call or logic.
  switch (language) {
    case 'python':
      return 'Python code executed successfully!\nOutput: [6, 0, 3, 5]';
    case 'c':
      return 'C code executed successfully!\nOutput: [6, 0, 3, 5]';
    case 'java':
      return 'Java code executed successfully!\nOutput: [6, 0, 3, 5]';
    default:
      return 'Unknown language!';
  }
}

document.getElementById('algorithm').addEventListener('change', () => {
  const algorithm = document.getElementById('algorithm').value;
  visualizeAlgorithm(algorithm);
});

function visualizeAlgorithm(algorithm) {
  const animationArea = document.getElementById('animation-area');
  animationArea.innerHTML = ''; // Clear previous animation

  const data = [6, 0, 3, 5]; // Sample data for visualization
  switch (algorithm) {
    case 'bubble':
      visualizeBubbleSort(animationArea, data);
      break;
    case 'merge':
      visualizeMergeSort(animationArea, data);
      break;
    case 'quick':
      visualizeQuickSort(animationArea, data);
      break;
    case 'insertion':
      visualizeInsertionSort(animationArea, data);
      break;
    case 'selection':
      visualizeSelectionSort(animationArea, data);
      break;
    case 'heap':
      visualizeHeapSort(animationArea, data);
      break;
    default:
      alert('Unknown sorting algorithm selected');
  }
}

function visualizeBubbleSort(container, data) {
  const steps = bubbleSortSteps(data);
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const { array, comparing, swapping, sortedIndex } = steps[currentStep];
      drawArray(container, array, comparing, swapping, sortedIndex);
      currentStep++;
    } else {
      clearInterval(interval);
      drawArray(container, data, [], [], data.length); // Final sorted array
    }
  }, 1000);
}

function bubbleSortSteps(data) {
  const steps = [];
  const array = data.slice();
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const step = {
        array: array.slice(),
        comparing: [j, j + 1],
        swapping: []
      };
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        step.swapping = [j, j + 1];
      }
      steps.push(step);
    }
    steps.push({ array: array.slice(), comparing: [], swapping: [], sortedIndex: n - i - 1 });
  }
  return steps;
}

function drawArray(container, array, comparing = [], swapping = [], sortedIndex = -1) {
  container.innerHTML = ''; // Clear previous drawing
  const barWidth = container.clientWidth / array.length;
  array.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.style.height = `${value * 20}px`;
    bar.style.width = `${barWidth - 2}px`;
    bar.style.display = 'inline-block';
    bar.style.marginRight = '2px';
    bar.style.position = 'relative';
    bar.style.textAlign = 'center';
    bar.style.lineHeight = `${value * 20}px`;
    bar.style.color = 'white';
    bar.textContent = value;

    if (comparing.includes(index)) {
      bar.style.backgroundColor = '#ffc107'; // Yellow for comparing
    } else if (swapping.includes(index)) {
      bar.style.backgroundColor = '#dc3545'; // Red for swapping
    } else if (index >= sortedIndex) {
      bar.style.backgroundColor = '#28a745'; // Green for sorted
    } else {
      bar.style.backgroundColor = '#007bff'; // Blue for unsorted
    }

    container.appendChild(bar);
  });
}

// Define similar visualization functions for other sorting algorithms
function visualizeMergeSort(container, data) {
  const steps = mergeSortSteps(data);
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const { array, merging } = steps[currentStep];
      drawArray(container, array, merging);
      currentStep++;
    } else {
      clearInterval(interval);
      drawArray(container, data, [], [], data.length); // Final sorted array
    }
  }, 1000);
}

function mergeSortSteps(data) {
  const steps = [];
  const array = data.slice();
  mergeSort(array, 0, array.length - 1, steps);
  return steps;
}

function mergeSort(array, left, right, steps) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(array, left, mid, steps);
    mergeSort(array, mid + 1, right, steps);
    merge(array, left, mid, right, steps);
  }
}

function merge(array, left, mid, right, steps) {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  const L = array.slice(left, mid + 1);
  const R = array.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      array[k] = L[i];
      i++;
    } else {
      array[k] = R[j];
      j++;
    }
    steps.push({ array: array.slice(), merging: [k] });
    k++;
  }

  while (i < n1) {
    array[k] = L[i];
    steps.push({ array: array.slice(), merging: [k] });
    i++;
    k++;
  }

  while (j < n2) {
    array[k] = R[j];
    steps.push({ array: array.slice(), merging: [k] });
    j++;
    k++;
  }
}

function visualizeQuickSort(container, data) {
  const steps = quickSortSteps(data);
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const { array, comparing, pivot } = steps[currentStep];
      drawArray(container, array, comparing, [], pivot);
      currentStep++;
    } else {
      clearInterval(interval);
      drawArray(container, data, [], [], data.length); // Final sorted array
    }
  }, 1000);
}

function quickSortSteps(data) {
  const steps = [];
  const array = data.slice();
  quickSort(array, 0, array.length - 1, steps);
  return steps;
}

function quickSort(array, low, high, steps) {
  if (low < high) {
    const pi = partition(array, low, high, steps);
    quickSort(array, low, pi - 1, steps);
    quickSort(array, pi + 1, high, steps);
  }
}

function partition(array, low, high, steps) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      steps.push({ array: array.slice(), comparing: [i, j], pivot: high });
    }
  }
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  steps.push({ array: array.slice(), comparing: [i + 1, high], pivot: high });
  return i + 1;
}

function visualizeInsertionSort(container, data) {
  const steps = insertionSortSteps(data);
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const { array, comparing, inserting } = steps[currentStep];
      drawArray(container, array, comparing, inserting);
      currentStep++;
    } else {
      clearInterval(interval);
      drawArray(container, data, [], [], data.length); // Final sorted array
    }
  }, 1000);
}

function insertionSortSteps(data) {
  const steps = [];
  const array = data.slice();
  const n = array.length;
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      steps.push({ array: array.slice(), comparing: [j, j + 1], inserting: [j + 1] });
      j--;
    }
    array[j + 1] = key;
    steps.push({ array: array.slice(), comparing: [], inserting: [j + 1] });
  }
  return steps;
}

// Define similar visualization functions for other sorting algorithms
function visualizeSelectionSort(container, data) {
  const steps = selectionSortSteps(data);
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const { array, comparing, swapping, sortedIndex } = steps[currentStep];
      drawArray(container, array, comparing, swapping, sortedIndex);
      currentStep++;
    } else {
      clearInterval(interval);
      drawArray(container, data, [], [], data.length); // Final sorted array
    }
  }, 1000);
}

function selectionSortSteps(data) {
  const steps = [];
  const array = data.slice();
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    steps.push({ array: array.slice(), comparing: [], swapping: [i, minIndex], sortedIndex: i });
  }
  return steps;
}

// Define similar visualization functions for other sorting algorithms
function visualizeHeapSort(container, data) {
  const steps = heapSortSteps(data);
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const { array, comparing, swapping, sortedIndex } = steps[currentStep];
      drawArray(container, array, comparing, swapping, sortedIndex);
      currentStep++;
    } else {
      clearInterval(interval);
      drawArray(container, data, [], [], data.length); // Final sorted array
    }
  }, 1000);
}

function heapSortSteps(data) {
  const steps = [];
  const array = data.slice();
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, steps);
  }

  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    steps.push({ array: array.slice(), comparing: [], swapping: [0, i], sortedIndex: i });
    heapify(array, i, 0, steps);
  }

  return steps;
}

function heapify(array, n, i, steps) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    steps.push({ array: array.slice(), comparing: [], swapping: [i, largest] });
    heapify(array, n, largest, steps);
  }
}