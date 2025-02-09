import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HandIcon, FileCheck, Clock, Star, Award, Shield, TrendingUp, Hand } from 'lucide-react';
import type { ReactNode } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Metric {
  name: string;
  value: number;
  change: number;
  unit: string;
  icon: ReactNode;
}

const metrics: Metric[] = [
  { 
    name: "Arrests", 
    value: 42, 
    change: 8, 
    unit: "", 
    icon: <Hand className="h-6 w-6 text-indigo-600" /> 
  },
  { 
    name: "Cases Solved", 
    value: 28, 
    change: -3, 
    unit: "", 
    icon: <FileCheck className="h-6 w-6 text-indigo-600" /> 
  },
  { 
    name: "Response Time", 
    value: 8.5, 
    change: -1.2, 
    unit: "min", 
    icon: <Clock className="h-6 w-6 text-indigo-600" /> 
  },
  { 
    name: "Community Rating", 
    value: 95, 
    change: 5, 
    unit: "%", 
    icon: <Star className="h-6 w-6 text-indigo-600" /> 
  },
];

const PerformanceMetrics: React.FC = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: 'Performance Score',
        data: [75, 68, 80, 82, 85, 90, 88, 85, 92, 95, 91, 93],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Officer Performance Dashboard</h1>
                <p className="text-gray-500">Badge #12345 - John Doe</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active Duty
              </span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                Senior Officer
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {metric.value}
                    <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
                  </p>
                </div>
                <div className="bg-indigo-100 rounded-lg p-2">
                  {metric.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`h-4 w-4 ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`ml-2 text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span className="ml-2 text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Performance Trend</h2>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium text-gray-600">Year to Date</span>
            </div>
          </div>
          <div className="h-[400px]">
            <Line data={chartData} options={options} />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Completion</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    90%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: "90%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Commendations</h3>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-8 w-8 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Outstanding performance in community service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;