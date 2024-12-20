import React from 'react';
import { Line } from 'react-chartjs-2';

import '@/app/utils/chart-setup'

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
        pointRadius: 0
      },
      {
        label: 'Min',
        data: minArray.slice(0, startupValue + 1),
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

  return (<div>
    <Line data={data} options={options} /></div>);
};

export default LineChart;
