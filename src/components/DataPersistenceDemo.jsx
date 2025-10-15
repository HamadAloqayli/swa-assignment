import { useState } from "react";
import { useDataManager } from "../hooks/useDataManager";
import { testDataPersistence } from "../utils/testDataPersistence";
import { RefreshCw, Database, CheckCircle, AlertCircle } from "lucide-react";

const DataPersistenceDemo = () => {
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const { data, resetData, getTotalStats } = useDataManager();
  const totalStats = getTotalStats();

  const runTests = async () => {
    setIsRunning(true);
    try {
      // Add a small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const results = testDataPersistence();
      setTestResults(results);
    } catch (error) {
      console.error("Test failed:", error);
      setTestResults({ success: false, error: error.message });
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetData = () => {
    resetData();
    setTestResults(null);
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Database className="text-blue-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Data Persistence Demo
          </h2>
          <p className="text-gray-600">
            Test the data management and persistence functionality
          </p>
        </div>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-blue-600" size={20} />
            <span className="text-sm font-medium text-blue-800">
              Under Process
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {totalStats.underProcess}
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-red-600" size={20} />
            <span className="text-sm font-medium text-red-800">Late</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{totalStats.late}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-sm font-medium text-green-800">Closed</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {totalStats.closed}
          </p>
        </div>
      </div>

      {/* Test Results */}
      {testResults && (
        <div
          className={`p-4 rounded-lg ${
            testResults.success
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {testResults.success ? (
              <CheckCircle className="text-green-600" size={20} />
            ) : (
              <AlertCircle className="text-red-600" size={20} />
            )}
            <span
              className={`font-medium ${
                testResults.success ? "text-green-800" : "text-red-800"
              }`}
            >
              Test Results
            </span>
          </div>

          {testResults.success ? (
            <div className="space-y-2">
              <p className="text-green-700">
                ✅ All {testResults.testsRun} tests passed successfully!
              </p>
              <div className="text-sm text-green-600 space-y-1">
                <p>• Data loading: Working</p>
                <p>• Document updates: Working</p>
                <p>• Document deletion: Working</p>
                <p>• Stats recalculation: Working</p>
                <p>• LocalStorage persistence: Working</p>
              </div>
            </div>
          ) : (
            <p className="text-red-700">❌ Test failed: {testResults.error}</p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={runTests}
          disabled={isRunning}
          className="btn-primary flex items-center gap-2 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw
            className={`${isRunning ? "animate-spin" : ""}`}
            size={16}
          />
          {isRunning ? "Running Tests..." : "Run Data Tests"}
        </button>

        <button
          onClick={handleResetData}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset Data
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">
          How to Test Data Persistence:
        </h3>
        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
          <li>Navigate to any department page (IT, HR, Finance, etc.)</li>
          <li>Edit or delete a document</li>
          <li>Navigate to the Dashboard to see updated stats</li>
          <li>Navigate back to the department page</li>
          <li>Verify that your changes are still there</li>
          <li>Refresh the browser page</li>
          <li>Confirm that changes persist after page refresh</li>
        </ol>
      </div>
    </div>
  );
};

export default DataPersistenceDemo;
