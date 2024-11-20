import React from 'react';
import { Bar } from 'react-chartjs-2';
import '@/app/utils/chart-setup'

interface BarChartProps {
  minValue: number;
  maxValue: number;
}

const BarChart: React.FC<BarChartProps> = ({ minValue, maxValue }) => {
  const data = {
    labels: ['Min', 'Max'],
    datasets: [
      {
        label: 'TVPI',
        data: [minValue, maxValue],
        backgroundColor: ['#AAAAAA', '#EA5600'],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { suggestedMin: 0, suggestedMax: 4 },
    },
  };

  return(
    <div>
         <Bar data={data} options={options} />
    </div>
  )
;
};

export default BarChart;
