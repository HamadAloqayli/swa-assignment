import { useState, useMemo } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";

const DepartmentPage = ({ department }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("document_number");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = [...department.documents];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.document_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          doc.subject.includes(searchTerm) ||
          doc.description.includes(searchTerm)
      );
    }

    // Status filter
    if (filterStatus === "closed") {
      filtered = filtered.filter((doc) => doc.closed_at !== null);
    } else if (filterStatus === "open") {
      filtered = filtered.filter((doc) => doc.closed_at === null);
    } else if (filterStatus === "late") {
      filtered = filtered.filter((doc) => {
        if (doc.closed_at) return false;
        const expiredDate = new Date(doc.expired_at);
        return expiredDate < new Date();
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy.includes("_at")) {
        aVal = aVal ? new Date(aVal) : new Date(0);
        bVal = bVal ? new Date(bVal) : new Date(0);
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [department.documents, searchTerm, sortBy, sortOrder, filterStatus]);

  const getDocumentStatus = (doc) => {
    if (doc.closed_at) return "closed";
    const expiredDate = new Date(doc.expired_at);
    if (expiredDate < new Date()) return "late";
    return "open";
  };

  const getStatusBadge = (status) => {
    const badges = {
      closed: (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          مغلقة
        </span>
      ),
      late: (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          متأخرة
        </span>
      ),
      open: (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          قيد المعالجة
        </span>
      ),
    };
    return badges[status];
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-4xl font-bold">{department.dept_name_ar}</h1>
        <p className="text-primary-100 mt-2">
          رقم الإدارة: {department.dept_no}
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
                {department.under_process_documents +
                  department.closed_documents}
              </p>
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
                {department.under_process_documents}
              </p>
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
                {department.under_process_late_documents}
              </p>
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
                {department.closed_documents}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-xl shadow-lg">
              <CheckCircle className="text-white" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          البحث والتصفية
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="ابحث عن رقم الوثيقة، الموضوع، أو الوصف..."
                className="input-field pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              className="input-field bg-white min-w-[160px]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="document_number">رقم الوثيقة</option>
              <option value="subject">الموضوع</option>
              <option value="created_at">تاريخ الإنشاء</option>
              <option value="expired_at">تاريخ الانتهاء</option>
            </select>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all duration-200"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              title={sortOrder === "asc" ? "تصاعدي" : "تنازلي"}
            >
              <ArrowUpDown
                size={20}
                className={
                  sortOrder === "desc"
                    ? "rotate-180 transition-transform"
                    : "transition-transform"
                }
              />
            </button>
          </div>

          {/* Filter */}
          <div className="flex gap-2 items-center">
            <Filter size={20} className="text-primary-600" />
            <select
              className="input-field bg-white min-w-[140px]"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">الكل ({department.documents.length})</option>
              <option value="open">قيد المعالجة</option>
              <option value="late">متأخرة</option>
              <option value="closed">مغلقة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">
            الوثائق ({filteredDocuments.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-50 to-primary-100">
              <tr>
                <th
                  className="table-header cursor-pointer hover:bg-primary-200 transition-colors duration-200"
                  onClick={() => handleSort("document_number")}
                >
                  <div className="flex items-center justify-start gap-2">
                    رقم الوثيقة
                    {sortBy === "document_number" && (
                      <ArrowUpDown
                        size={14}
                        className={sortOrder === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th
                  className="table-header cursor-pointer hover:bg-primary-200 transition-colors duration-200"
                  onClick={() => handleSort("subject")}
                >
                  <div className="flex items-center justify-start gap-2">
                    الموضوع
                    {sortBy === "subject" && (
                      <ArrowUpDown
                        size={14}
                        className={sortOrder === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th className="table-header">الوصف</th>
                <th
                  className="table-header cursor-pointer hover:bg-primary-200 transition-colors duration-200"
                  onClick={() => handleSort("created_at")}
                >
                  <div className="flex items-center justify-start gap-2">
                    تاريخ الإنشاء
                    {sortBy === "created_at" && (
                      <ArrowUpDown
                        size={14}
                        className={sortOrder === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th
                  className="table-header cursor-pointer hover:bg-primary-200 transition-colors duration-200"
                  onClick={() => handleSort("expired_at")}
                >
                  <div className="flex items-center justify-start gap-2">
                    تاريخ الانتهاء
                    {sortBy === "expired_at" && (
                      <ArrowUpDown
                        size={14}
                        className={sortOrder === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th className="table-header">تاريخ الإغلاق</th>
                <th className="table-header">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredDocuments.map((doc, index) => (
                <tr
                  key={doc.document_number}
                  className="hover:bg-primary-50 transition-colors duration-150"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-primary-600">
                      {doc.document_number}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {doc.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                    <div className="line-clamp-2" title={doc.description}>
                      {doc.description}
                    </div>
                  </td>
                  <td className="table-cell">{doc.created_at}</td>
                  <td className="table-cell">{doc.expired_at}</td>
                  <td className="table-cell">
                    {doc.closed_at || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(getDocumentStatus(doc))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDocuments.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 text-lg font-medium">
              لا توجد وثائق متطابقة مع معايير البحث
            </p>
            <p className="text-gray-400 text-sm mt-2">
              جرب تعديل معايير البحث أو التصفية
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentPage;
