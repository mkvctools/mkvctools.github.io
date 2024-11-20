export function interpolationChart(input: number[], startupCount: number): number[] {
    const output: number[] = [];
  
    // Füge den ersten Wert des Eingabearrays zum Ausgabearray hinzu
    output.push(input[0]);
  
    for (let i = 1; i < startupCount; i++) {
      const x = i * (input.length - 1) / (startupCount - 1);
      const lowerIndex = Math.floor(x);
      const upperIndex = Math.ceil(x);
      const lowerValue = input[lowerIndex];
      const upperValue = input[upperIndex];
      const interpolatedValue = lowerValue + (upperValue - lowerValue) * (x - lowerIndex);
      output.push(interpolatedValue);
    }
  
    // Füge den letzten Wert des Eingabearrays zum Ausgabearray hinzu
    output.push(input[input.length - 1]);
  
    return output;
  }
  

  export function interpolateArrays(
    inputProb: number[],
    inputStartups: number[]
  ): number[] {
    const outputArray: number[] = new Array(400).fill(0);
  
    for (let i = 0; i < outputArray.length; i++) {
      const x = i * (inputStartups[inputStartups.length - 1] / (outputArray.length - 1));
      const nextIndex = inputStartups.findIndex((val) => val > x);
      const startIndex = nextIndex === -1 ? inputStartups.length - 2 : nextIndex - 1;
  
      const delta = inputStartups[nextIndex] - inputStartups[startIndex];
      const deltaProb = inputProb[nextIndex] - inputProb[startIndex];
      const ratio = (x - inputStartups[startIndex]) / delta;
  
      outputArray[i] = inputProb[startIndex] + deltaProb * ratio;
    }
  
    return outputArray.map((val) => val * 100); // Werte in Prozent umwandeln
  }
  

  export function roiArrayFill(inputArray: number[], multValue: number): number[] {
    return inputArray.map((value) => value * multValue);
  }
  

  export function fillX(count: number): number[] {
    return Array.from({ length: count + 1 }, (_, i) => i);
  }

  export function cubicInterpolation(inputArray: number[]): number[] {
    const outputArray: number[] = [];
    const n = inputArray.length - 1;
    const step = n / 399;
  
    for (let i = 0; i < 400; i++) {
      const x = i * step;
      const k = Math.floor(x);
      const t = x - k;
      const k1 = Math.min(k + 1, n);
      const k2 = Math.min(k + 2, n);
      const k3 = Math.min(k + 3, n);
      const y0 = inputArray[k];
      const y1 = inputArray[k1];
      const y2 = inputArray[k2];
      const y3 = inputArray[k3];
      const a0 = y3 - y2 - y0 + y1;
      const a1 = y0 - y1 - a0;
      const a2 = y2 - y0;
      const a3 = y1;
  
      outputArray.push(a0 * t * t * t + a1 * t * t + a2 * t + a3);
    }
  
    return outputArray;
  }
  
  export function cubicProbInterpolation(inputArray: number[]): number[] {
    const outputArray: number[] = [];
    const n = inputArray.length - 1;
    const step = n / 399;
  
    for (let i = 0; i < 400; i++) {
      const x = i * step;
      const k = Math.floor(x);
      const t = x - k;
      const k1 = Math.min(k + 1, n);
      const k2 = Math.min(k + 2, n);
      const k3 = Math.min(k + 3, n);
      const y0 = inputArray[k];
      const y1 = inputArray[k1];
      const y2 = inputArray[k2];
      const y3 = inputArray[k3];
      const a0 = y3 - y2 - y0 + y1;
      const a1 = y0 - y1 - a0;
      const a2 = y2 - y0;
      const a3 = y1;
  
      outputArray.push(a0 * t * t * t + a1 * t * t + a2 * t + a3);
    }
  
    return outputArray;
  }
  