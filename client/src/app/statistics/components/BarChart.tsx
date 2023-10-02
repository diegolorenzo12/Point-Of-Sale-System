import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  groupedProducts: { [name: string]: number };
}

const BarChart: React.FC<BarChartProps> = ({ groupedProducts }) => {
  const productNames = Object.keys(groupedProducts);
  const productQuantities = Object.values(groupedProducts);


  const chartData = {
    labels: productNames,
    datasets: [
      {
        label: 'Quantity Sold',
        data: productQuantities,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  return (
    <Bar data={chartData} options={options} />
  );
};

export default BarChart;
