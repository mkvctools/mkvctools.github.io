import React from 'react';
import { Line } from 'react-chartjs-2';
import '@/app/utils/chart-setup';

interface ProbChartProps {
  startupValue: number;
  probArray: number[];
}

const ProbChart: React.FC<ProbChartProps> = ({ startupValue, probArray }) => {
  const numPoints = 10; // Anzahl der Punkte für den Chart
  const step = startupValue / numPoints;

  // Gleichmäßig verteilte X-Werte
  const labels = Array.from({ length: numPoints + 1 }, (_, i) => Math.round(i * step));

  // Y-Werte holen (fix: Letzter Wert bleibt stabil)
  const sampledProbArray = labels.map(x => probArray[Math.min(x, probArray.length - 1)]);

  const data = {
    labels: labels, // Reduzierte X-Werte
    datasets: [
      {
        label: 'Probability',
        data: sampledProbArray,
        borderColor: '#EA5600',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { suggestedMin: 0, suggestedMax: 100 },
    },
  };

  return <Line data={data} options={options} />;
};

export default ProbChart;
