import { it } from "../data/it";
import { hr } from "../data/hr";
import { finance } from "../data/finance";
import { law } from "../data/law";
import { pmo } from "../data/pmo";
import { cyber } from "../data/cyber";
import { audit } from "../data/audit";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Monitor,
  Users,
  DollarSign,
  Scale,
  Briefcase,
  Shield,
  FileCheck,
} from "lucide-react";
import * as XLSX from "xlsx";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();

  // Combine all departments
  const departments = [
    it[0],
    hr[0],
    finance[0],
    law[0],
    pmo[0],
    cyber[0],
    audit[0],
  ];

  // Department icons and routes mapping
  const departmentConfig = {
    IT: { icon: Monitor, route: "/it" },
    HR: { icon: Users, route: "/hr" },
    Finance: { icon: DollarSign, route: "/finance" },
    "Law And Governance": { icon: Scale, route: "/law" },
    PMO: { icon: Briefcase, route: "/pmo" },
    "Cyber Security": { icon: Shield, route: "/cyber" },
    "Internal Audit": { icon: FileCheck, route: "/audit" },
  };

  // Calculate total stats
  const totalStats = departments.reduce(
    (acc, dept) => ({
      underProcess: acc.underProcess + dept.under_process_documents,
      late: acc.late + dept.under_process_late_documents,
      closed: acc.closed + dept.closed_documents,
    }),
    { underProcess: 0, late: 0, closed: 0 }
  );

  // Prepare data for Chart.js
  const labels = departments.map((dept) => dept.dept_name_ar);

  const barChartData = {
    labels,
    datasets: [
      {
        label: "قيد المعالجة",
        data: departments.map((dept) => dept.under_process_documents),
        backgroundColor: "#3b82f6",
        borderRadius: 8,
      },
      {
        label: "متأخرة",
        data: departments.map((dept) => dept.under_process_late_documents),
        backgroundColor: "#ef4444",
        borderRadius: 8,
      },
      {
        label: "مغلقة",
        data: departments.map((dept) => dept.closed_documents),
        backgroundColor: "#10b981",
        borderRadius: 8,
      },
    ],
  };

  const pieChartData = {
    labels,
    datasets: [
      {
        data: departments.map(
          (dept) =>
            dept.under_process_documents +
            dept.under_process_late_documents +
            dept.closed_documents
        ),
        backgroundColor: [
          "#2563eb",
          "#3b82f6",
          "#60a5fa",
          "#93c5fd",
          "#bfdbfe",
          "#dbeafe",
          "#1d4ed8",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "قيد المعالجة",
        data: departments.map((dept) => dept.under_process_documents),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "متأخرة",
        data: departments.map((dept) => dept.under_process_late_documents),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "مغلقة",
        data: departments.map((dept) => dept.closed_documents),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        rtl: true,
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            family: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            size: 12,
          },
        },
      },
      tooltip: {
        rtl: true,
        backgroundColor: "white",
        titleColor: "#1f2937",
        bodyColor: "#6b7280",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          font: {
            family: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            size: 11,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
          font: {
            family: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
          },
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        rtl: true,
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            family: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            size: 12,
          },
        },
      },
      tooltip: {
        rtl: true,
        backgroundColor: "white",
        titleColor: "#1f2937",
        bodyColor: "#6b7280",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  const handleExportSummary = () => {
    // Prepare summary data for export
    const exportData = departments.map((dept) => ({
      الإدارة: dept.dept_name_ar,
      "رقم الإدارة": dept.dept_no,
      "قيد المعالجة": dept.under_process_documents,
      متأخرة: dept.under_process_late_documents,
      مغلقة: dept.closed_documents,
      الإجمالي:
        dept.under_process_documents +
        dept.under_process_late_documents +
        dept.closed_documents,
    }));

    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ملخص الإدارات");

    // Generate file name with date
    const fileName = `ملخص_الإدارات_${new Date().toLocaleDateString(
      "ar-SA"
    )}.xlsx`;

    // Export file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-32 translate-y-32"></div>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl shadow-lg">
              <LayoutDashboard size={48} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">لوحة التحكم</h1>
              <p className="text-primary-100 mt-2 text-lg">
                نظرة عامة على جميع الإدارات والوثائق
              </p>
            </div>
          </div>
          <button
            onClick={handleExportSummary}
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <Download size={20} />
            تصدير الملخص
          </button>
        </div>
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
                {totalStats.underProcess + totalStats.late + totalStats.closed}
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
          <div style={{ height: "380px" }}>
            <Bar data={barChartData} options={chartOptions} />
          </div>
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
          <div style={{ height: "380px" }}>
            <Pie data={pieChartData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">اتجاه الوثائق</h2>
            <p className="text-sm text-gray-500 mt-1">
              توزيع الوثائق حسب الحالة لكل إدارة
            </p>
          </div>
        </div>
        <div style={{ height: "380px" }}>
          <Line data={lineChartData} options={chartOptions} />
        </div>
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
              {departments.map((dept, index) => {
                const config = departmentConfig[dept.dept_name];
                const DeptIcon = config?.icon;

                return (
                  <tr
                    key={dept.dept_no}
                    className="hover:bg-primary-50 transition-colors duration-150 cursor-pointer group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => navigate(config?.route)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 transition-colors">
                        {DeptIcon && (
                          <div className="bg-primary-100 p-2 rounded-lg group-hover:bg-primary-200 transition-colors">
                            <DeptIcon size={20} className="text-primary-600" />
                          </div>
                        )}
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
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
                        {dept.under_process_documents +
                          dept.under_process_late_documents +
                          dept.closed_documents}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
