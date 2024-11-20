import React from 'react';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
  startupValue: number;
  minArray: number[];
  maxArray: number[];
}

const LineChart: React.FC<LineChartProps> = ({ startupValue, minArray, maxArray }) => {
  const data = {
    labels: Array.from({ length: startupValue + 1 }, (_, i) => i),
    datasets: [
      {
        label: 'Max',
        data: maxArray.slice(0, startupValue + 1),
        borderColor: '#EA5600',
        tension: 0.4,
      },
      {
        label: 'Min',
        data: minArray.slice(0, startupValue + 1),
        borderColor: '#FFFFFF',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { suggestedMin: 0, suggestedMax: 4 },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
