import React from "react";
import { format } from "date-fns";

interface PerformanceData {
  officerName: string;
  officerId: string;
  casesHandledThisMonth: number;
  casesClosedThisMonth: number;
  averageResponseTime: string; // e.g., "5 min 30 sec"
  digitalReportsFiled: number;
  lastUpdated: Date;
}

const dummyPerformanceData: PerformanceData = {
  officerName: "Officer John Doe",
  officerId: "JD12345",
  casesHandledThisMonth: 45,
  casesClosedThisMonth: 38,
  averageResponseTime: "4 min 52 sec",
  digitalReportsFiled: 42,
  lastUpdated: new Date(),
};

const PerformanceDashboard: React.FC = () => {
  const data = dummyPerformanceData; // In real app, fetch data here

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-7xl bg-white shadow-md rounded-lg p-8">
        {/* Dashboard Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Officer Performance Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Monitoring key performance indicators for accountability and
            efficiency.
          </p>
        </div>

        {/* Officer Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Officer: {data.officerName}
          </h2>
          <p className="text-gray-600">Officer ID: {data.officerId}</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cases Handled This Month */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Cases Handled (This Month)
            </h3>
            <p className="text-3xl font-bold text-indigo-600">
              {data.casesHandledThisMonth}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Number of cases assigned or handled in the current month.
            </p>
          </div>

          {/* Cases Closed This Month */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Cases Closed (This Month)
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {data.casesClosedThisMonth}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Number of cases successfully closed in the current month.
            </p>
          </div>

          {/* Average Response Time */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Average Response Time
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {data.averageResponseTime}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Average time taken to respond to incident reports.
            </p>
          </div>

          {/* Digital Reports Filed */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Digital Reports Filed
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {data.digitalReportsFiled}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Number of incident reports filed digitally using the app.
            </p>
          </div>
        </div>

        {/* Last Updated Timestamp */}
        <div className="mt-8 text-sm text-gray-500 text-right">
          Last updated: {format(data.lastUpdated, "MMM d, yyyy, h:mm a")}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
