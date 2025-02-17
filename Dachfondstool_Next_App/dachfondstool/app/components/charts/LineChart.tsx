import React from 'react';
import { Line } from 'react-chartjs-2';
import '@/app/utils/chart-setup';

interface LineChartProps {
  startupValue: number;
  minArray: number[];
  maxArray: number[];
}

const LineChart: React.FC<LineChartProps> = ({ startupValue, minArray, maxArray }) => {
  const numPoints = 10; // Anzahl der Punkte, die im Chart angezeigt werden sollen
  const step = Math.floor(startupValue / (numPoints - 1));

  // X-Werte (gleichmäßig verteilt zwischen 0 und startupValue)
  const labels = Array.from({ length: numPoints }, (_, i) => 
    i === numPoints - 1 ? startupValue : i * step
  );
  

  // Y-Werte an den entsprechenden X-Werten holen
  const sampledMinArray = labels.map(x => minArray[x]);
  const sampledMaxArray = labels.map(x => maxArray[x]);

  const data = {
    labels: labels, // Reduzierte X-Werte
    datasets: [
      {
        label: 'Max',
        data: sampledMaxArray,
        borderColor: '#EA5600',
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: 'Min',
        data: sampledMinArray,
        borderColor: '#CCC',
        tension: 0.4,
        pointRadius: 0
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { suggestedMin: 0, suggestedMax: 4 },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
