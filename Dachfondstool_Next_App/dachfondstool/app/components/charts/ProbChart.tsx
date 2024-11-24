import React from 'react';
import { Line } from 'react-chartjs-2';
import '@/app/utils/chart-setup'

interface ProbChartProps {
  startupValue: number;
  probArray: number[];
}

const ProbChart: React.FC<ProbChartProps> = ({ startupValue, probArray }) => {
  const data = {
    labels: Array.from({ length: startupValue + 1 }, (_, i) => i),
    datasets: [
      {
        label: 'Probability',
        data: probArray.slice(0, startupValue + 1),
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
