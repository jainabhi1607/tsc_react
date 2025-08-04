// BarChart.js
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ jobsImp, graphMaxValue, graphInterval }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Job Cards',
        data: jobsImp,
        backgroundColor: '#04adef',
        borderRadius: 10,
        barThickness: 12,
        borderWidth: 0,
        borderColor: '#04adef',
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: context => `${context.dataset.label}: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: graphMaxValue,
        ticks: {
          stepSize: graphInterval,
          padding: 10
        },
        grid: {
          color: '#FFF',
          drawTicks: false,
          drawBorder: false
        }
      },
      x: {
        type: 'category', // <-- Fix: force category scale
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          padding: 10,
          maxRotation: 0,
          minRotation: 0
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
