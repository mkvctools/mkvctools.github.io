import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    LineElement,
    PointElement,
    LineController,
    BarController,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Registriere die Module
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    LineElement,
    PointElement,
    LineController,
    BarController,
    Title,
    Tooltip,
    Legend
  );
  
  export default ChartJS;
  