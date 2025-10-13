import { departments } from "../data/mockData";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Dashboard = () => {
  // Calculate total stats
  const totalStats = departments.reduce(
    (acc, dept) => ({
      underProcess: acc.underProcess + dept.under_process_documents,
      late: acc.late + dept.under_process_late_documents,
      closed: acc.closed + dept.closed_documents,
    }),
    { underProcess: 0, late: 0, closed: 0 }
  );

  // Prepare data for charts
  const barChartData = departments.map((dept) => ({
    name: dept.dept_name_ar,
    "قيد المعالجة": dept.under_process_documents,
    متأخرة: dept.under_process_late_documents,
    مغلقة: dept.closed_documents,
  }));

  const pieChartData = departments.map((dept) => ({
    name: dept.dept_name_ar,
    value: dept.under_process_documents + dept.closed_documents,
  }));

  const lineChartData = departments.map((dept, index) => ({
    name: dept.dept_name_ar,
    الوثائق: dept.under_process_documents + dept.closed_documents,
  }));

  const COLORS = [
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#bfdbfe",
    "#dbeafe",
    "#1d4ed8",
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-4xl font-bold">لوحة التحكم</h1>
        <p className="text-primary-100 mt-2">
          نظرة عامة على جميع الإدارات والوثائق
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card border-r-4 border-primary-500 bg-gradient-to-br from-white to-primary-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                إجمالي الوثائق
              </p>
              <p className="text-4xl font-bold text-gray-800 mt-2">
                {totalStats.underProcess + totalStats.closed}
              </p>
              <p className="text-xs text-gray-500 mt-1">جميع الإدارات</p>
            </div>
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-xl shadow-lg">
              <FileText className="text-white" size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card border-r-4 border-blue-400 bg-gradient-to-br from-white to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">قيد المعالجة</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {totalStats.underProcess}
              </p>
              <p className="text-xs text-gray-500 mt-1">وثيقة نشطة</p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-xl shadow-lg">
              <Clock className="text-white" size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card border-r-4 border-red-400 bg-gradient-to-br from-white to-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">متأخرة</p>
              <p className="text-4xl font-bold text-red-600 mt-2">
                {totalStats.late}
              </p>
              <p className="text-xs text-gray-500 mt-1">تحتاج متابعة</p>
            </div>
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-4 rounded-xl shadow-lg">
              <AlertCircle className="text-white" size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card border-r-4 border-green-400 bg-gradient-to-br from-white to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">مغلقة</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {totalStats.closed}
              </p>
              <p className="text-xs text-gray-500 mt-1">تم الانتهاء</p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-xl shadow-lg">
              <CheckCircle className="text-white" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                إحصائيات الإدارات
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                توزيع الوثائق حسب الحالة
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar
                dataKey="قيد المعالجة"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
              <Bar dataKey="متأخرة" fill="#ef4444" radius={[8, 8, 0, 0]} />
              <Bar dataKey="مغلقة" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                توزيع الوثائق حسب الإدارة
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                النسب المئوية لكل إدارة
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">اتجاه الوثائق</h2>
            <p className="text-sm text-gray-500 mt-1">
              إجمالي الوثائق لكل إدارة
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="الوثائق"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: "#2563eb", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Department Summary */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">ملخص الإدارات</h2>
            <p className="text-sm text-gray-500 mt-1">
              تفاصيل شاملة لجميع الإدارات
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-50 to-primary-100">
              <tr>
                <th className="table-header">الإدارة</th>
                <th className="table-header">قيد المعالجة</th>
                <th className="table-header">متأخرة</th>
                <th className="table-header">مغلقة</th>
                <th className="table-header">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {departments.map((dept, index) => (
                <tr
                  key={dept.dept_no}
                  className="hover:bg-primary-50 transition-colors duration-150"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-500 ml-3"></div>
                      <span className="text-sm font-semibold text-gray-900">
                        {dept.dept_name_ar}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {dept.under_process_documents}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {dept.under_process_late_documents}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {dept.closed_documents}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-bold text-gray-900">
                      {dept.under_process_documents + dept.closed_documents}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
