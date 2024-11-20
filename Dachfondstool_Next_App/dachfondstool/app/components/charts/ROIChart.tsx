import React from 'react';
import { Line } from 'react-chartjs-2';
import '@/app/utils/chart-setup'

interface ROIChartProps {
  startupValue: number;
  roiArrayMin: number[];
  roiArrayMax: number[];
}

const ROIChart: React.FC<ROIChartProps> = ({ startupValue, roiArrayMin, roiArrayMax }) => {
  const data = {
    labels: Array.from({ length: startupValue + 1 }, (_, i) => i),
    datasets: [
      {
        label: 'Max ROI',
        data: roiArrayMax.slice(0, startupValue + 1),
        borderColor: '#EA5600',
        tension: 0.4,
      },
      {
        label: 'Min ROI',
        data: roiArrayMin.slice(0, startupValue + 1),
        borderColor: '#FFFFFF',
        tension: 0.4,
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

export default ROIChart;
