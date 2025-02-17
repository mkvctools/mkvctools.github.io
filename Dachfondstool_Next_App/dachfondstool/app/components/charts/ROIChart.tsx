import React from 'react';
import { Line } from 'react-chartjs-2';
import '@/app/utils/chart-setup';

interface ROIChartProps {
  startupValue: number;
  roiArrayMin: number[];
  roiArrayMax: number[];
}

const ROIChart: React.FC<ROIChartProps> = ({ startupValue, roiArrayMin, roiArrayMax }) => {
  const numPoints = 10;
  const step = Math.floor(startupValue / (numPoints - 1));

  const labels = Array.from({ length: numPoints }, (_, i) => 
    i === numPoints - 1 ? startupValue : i * step
  );

  // Sichere Sampling-Methode
  const sampledMinArray = labels.map(x => roiArrayMin[Math.min(Math.floor(x), roiArrayMin.length - 1)]);
  const sampledMaxArray = labels.map(x => roiArrayMax[Math.min(Math.floor(x), roiArrayMax.length - 1)]);

  console.log("Sampled Min:", sampledMinArray);
  console.log("Sampled Max:", sampledMaxArray);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Max ROI',
        data: sampledMaxArray,
        borderColor: '#EA5600',
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: 'Min ROI',
        data: sampledMinArray,
        borderColor: '#CCC',
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

export default ROIChart;
