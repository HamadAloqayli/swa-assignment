import { useState, useMemo, useEffect } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Eye,
  Edit,
  Trash2,
  Printer,
  X,
  Save,
  Calendar,
  User,
} from "lucide-react";
import * as XLSX from "xlsx";
import Pagination from "../components/Pagination";
import { useDataManager } from "../hooks/useDataManager";

const DepartmentPage = ({ department, icon: Icon }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("document_number");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [viewModal, setViewModal] = useState({ isOpen: false, document: null });
  const [editModal, setEditModal] = useState({ isOpen: false, document: null });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    document: null,
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Use data manager hook
  const {
    data,
    updateDocument,
    deleteDocument: removeDocument,
    getDepartment,
  } = useDataManager();

  // Get current department data from data manager - this will be reactive to data changes
  const currentDepartment = useMemo(() => {
    return getDepartment(department.dept_no) || department;
  }, [data, department.dept_no]);

  const localDocuments = currentDepartment.documents;

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = [...localDocuments];

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

    // Reset to first page when filters change
    setCurrentPage(1);

    return filtered;
  }, [localDocuments, searchTerm, sortBy, sortOrder, filterStatus]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

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

  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredDocuments.map((doc) => ({
      "رقم الوثيقة": doc.document_number,
      الموضوع: doc.subject,
      الوصف: doc.description,
      "تاريخ الإنشاء": doc.created_at,
      "تاريخ الانتهاء": doc.expired_at,
      "تاريخ الإغلاق": doc.closed_at || "-",
      الحالة: doc.closed_at
        ? "مغلقة"
        : new Date(doc.expired_at) < new Date()
        ? "متأخرة"
        : "قيد المعالجة",
    }));

    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, currentDepartment.dept_name_ar);

    // Generate file name with department name and date
    const fileName = `${
      currentDepartment.dept_name_ar
    }_${new Date().toLocaleDateString("ar-SA")}.xlsx`;

    // Export file
    XLSX.writeFile(wb, fileName);
  };

  // Toast function
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Action handlers
  const handleView = (document) => {
    setViewModal({ isOpen: true, document });
  };

  const handleEdit = (document) => {
    setEditModal({ isOpen: true, document });
  };

  const handleDelete = (document) => {
    setDeleteModal({ isOpen: true, document });
  };

  // Confirm delete
  const confirmDelete = (document) => {
    const success = removeDocument(
      department.dept_no,
      document.document_number
    );
    if (success) {
      setDeleteModal({ isOpen: false, document: null });
      showToast("تم حذف الوثيقة بنجاح", "success");
    } else {
      showToast("فشل في حذف الوثيقة", "error");
    }
  };

  // Save edit
  const saveEdit = (updatedDocument) => {
    const success = updateDocument(department.dept_no, updatedDocument);
    if (success) {
      setEditModal({ isOpen: false, document: null });
      showToast("تم تحديث الوثيقة بنجاح", "success");
    } else {
      showToast("فشل في تحديث الوثيقة", "error");
    }
  };

  const handlePrint = (document) => {
    const currentDate = new Date().toLocaleDateString("ar-SA");

    // Create a new window for printing
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!printWindow) {
      alert("يرجى السماح بالنوافذ المنبثقة لاستخدام وظيفة الطباعة");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <title>وثيقة - ${document.document_number}</title>
          <style>
            @page {
              margin: 0.5in;
              size: A4;
            }
            
            * { 
              box-sizing: border-box; 
              margin: 0;
              padding: 0;
            }
            
            body {
              font-family: 'Segoe UI', 'Cairo', Tahoma, Geneva, Verdana, sans-serif;
              direction: rtl;
              line-height: 1.4;
              color: #1a202c;
              background: white;
              font-size: 14px;
            }
            
            .container {
              max-width: 100%;
              margin: 0 auto;
            }
            
            /* Header */
            .header {
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            
            .header h1 {
              font-size: 20px;
              font-weight: 700;
              margin-bottom: 5px;
            }
            
            .header h2 {
              font-size: 14px;
              opacity: 0.9;
              font-weight: 400;
            }
          
            .document-header {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              gap: 5px;
              margin-bottom: 20px;
              font-weight: 700;
              font-size: 12px;
            }
            
            /* Content */
            .content {
              padding: 0;
            }
            
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 20px;
            }
            
            .info-item {
              background: #f8fafc;
              padding: 12px;
              border-radius: 6px;
              border-right: 3px solid #3b82f6;
            }
            
            .info-label {
              font-size: 11px;
              font-weight: 600;
              color: #64748b;
              margin-bottom: 5px;
              text-transform: uppercase;
            }
            
            .info-value {
              font-size: 13px;
              font-weight: 600;
              color: #1a202c;
            }
            
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 600;
            }
            
            .status-open { 
              background: #dbeafe; 
              color: #1e40af; 
            }
            .status-late { 
              background: #fecaca; 
              color: #dc2626; 
            }
            .status-closed { 
              background: #d1fae5; 
              color: #059669; 
            }
            
            .description-section {
              background: #f8fafc;
              padding: 15px;
              border-radius: 6px;
              border-right: 3px solid #10b981;
              margin-bottom: 20px;
            }
            
            .description-label {
              font-size: 14px;
              font-weight: 700;
              color: #059669;
              margin-bottom: 8px;
            }
            
            .description-text {
              font-size: 13px;
              line-height: 1.5;
              color: #374151;
            }
            
            /* Footer */
            .footer {
              background: #f1f5f9;
              padding: 15px;
              text-align: center;
              border-radius: 6px;
              border-top: 2px solid #e2e8f0;
            }
            
            .footer-text {
              font-size: 11px;
              color: #64748b;
              margin-bottom: 5px;
            }
            
            .print-date {
              font-size: 10px;
              color: #9ca3af;
            }
            
            /* Print Optimizations */
            @media print {
              body { 
                background: white; 
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
              }
              .container { 
                box-shadow: none; 
                border-radius: 0; 
              }
              .header, .info-item, .description-section, .footer {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>الهيئة السعودية للمياه</h1>
              <h2>نظام إدارة الوثائق</h2>
            </div>

            <!-- Content -->
            <div class="content">
             <div class="document-header">
              <div class="document-title">${document.subject}</div>
              <div class="document-number">رقم الوثيقة: ${
                document.document_number
              }</div>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">تاريخ الإنشاء</div>
                  <div class="info-value">${document.created_at}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">تاريخ الانتهاء</div>
                  <div class="info-value">${document.expired_at}</div>
                </div>
                ${
                  document.closed_at
                    ? `
                <div class="info-item">
                  <div class="info-label">تاريخ الإغلاق</div>
                  <div class="info-value">${document.closed_at}</div>
                </div>
                `
                    : ""
                }
                <div class="info-item">
                  <div class="info-label">الحالة</div>
                  <div class="info-value">
                    <span class="status-badge ${
                      document.closed_at
                        ? "status-closed"
                        : new Date(document.expired_at) < new Date()
                        ? "status-late"
                        : "status-open"
                    }">
                      ${
                        document.closed_at
                          ? "مغلقة"
                          : new Date(document.expired_at) < new Date()
                          ? "متأخرة"
                          : "قيد المعالجة"
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div class="description-section">
                <div class="description-label">وصف الوثيقة</div>
                <div class="description-text">${document.description}</div>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <div class="footer-text">الهيئة السعودية للمياه - نظام إدارة الوثائق</div>
              <div class="print-date">تم إنشاء هذا التقرير في ${currentDate}</div>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print();
      // Close the print window after printing
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
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
            {Icon && (
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl shadow-lg">
                <Icon size={48} className="text-white" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold">{department.dept_name_ar}</h1>
              <p className="text-primary-100 mt-2 text-lg">
                رقم الإدارة: {department.dept_no}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="stat-card border-r-4 border-purple-500 bg-gradient-to-br from-white to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm font-medium">
                إجمالي الوثائق
              </p>
              <p className="text-3xl md:text-4xl font-bold text-purple-600 mt-2">
                {currentDepartment.under_process_documents +
                  currentDepartment.under_process_late_documents +
                  currentDepartment.closed_documents}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 md:p-4 rounded-xl shadow-lg">
              <FileText className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card border-r-4 border-blue-400 bg-gradient-to-br from-white to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm font-medium">
                قيد المعالجة
              </p>
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mt-2">
                {currentDepartment.under_process_documents}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 md:p-4 rounded-xl shadow-lg">
              <Clock className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card border-r-4 border-red-400 bg-gradient-to-br from-white to-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm font-medium">
                متأخرة
              </p>
              <p className="text-3xl md:text-4xl font-bold text-red-600 mt-2">
                {currentDepartment.under_process_late_documents}
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-3 md:p-4 rounded-xl shadow-lg">
              <AlertCircle className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card border-r-4 border-green-400 bg-gradient-to-br from-white to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm font-medium">
                مغلقة
              </p>
              <p className="text-3xl md:text-4xl font-bold text-green-600 mt-2">
                {currentDepartment.closed_documents}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 md:p-4 rounded-xl shadow-lg">
              <CheckCircle className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="card p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-800">
            البحث والتصفية
          </h3>
          <button
            onClick={handleExport}
            className="btn-primary flex items-center gap-2 text-sm md:text-base px-4 md:px-6 w-full sm:w-auto justify-center cursor-pointer"
          >
            <Download size={18} className="md:w-5 md:h-5" />
            <span className="hidden sm:inline">تصدير Excel</span>
            <span className="sm:hidden">تصدير</span>
          </button>
        </div>
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
              className="input-field bg-white min-w-[160px] text-sm md:text-base"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="document_number">رقم الوثيقة</option>
              <option value="subject">الموضوع</option>
              <option value="created_at">تاريخ الإنشاء</option>
              <option value="expired_at">تاريخ الانتهاء</option>
            </select>
            <button
              className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all duration-200"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              title={sortOrder === "asc" ? "تصاعدي" : "تنازلي"}
            >
              <ArrowUpDown
                size={18}
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
            <Filter size={18} className="text-primary-600 hidden sm:block" />
            <select
              className="input-field bg-white min-w-[140px] text-sm md:text-base"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">
                الكل ({currentDepartment.documents.length})
              </option>
              <option value="open">قيد المعالجة</option>
              <option value="late">متأخرة</option>
              <option value="closed">مغلقة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <h3 className="text-base md:text-lg font-semibold text-white">
            الوثائق ({filteredDocuments.length})
          </h3>
          {filteredDocuments.length > 0 && (
            <span className="text-xs md:text-sm text-primary-100">
              {currentPage}/{totalPages}
            </span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
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
                <th className="table-header text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedDocuments.map((doc, index) => (
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(doc)}
                        className="cursor-pointer p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="عرض"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(doc)}
                        className="cursor-pointer p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
                        title="تعديل"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handlePrint(doc)}
                        className="cursor-pointer p-2 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
                        title="طباعة"
                      >
                        <Printer size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(doc)}
                        className="cursor-pointer p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredDocuments.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* View Modal */}
      {viewModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setViewModal({ isOpen: false, document: null })}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 rounded-t-2xl flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      عرض الوثيقة
                    </h2>
                    <p className="text-primary-100">
                      {viewModal.document?.document_number}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setViewModal({ isOpen: false, document: null })
                  }
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Body - Scrollable */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    رقم الوثيقة
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg font-medium">
                    {viewModal.document?.document_number}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    الحالة
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {viewModal.document &&
                      getStatusBadge(getDocumentStatus(viewModal.document))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    تاريخ الإنشاء
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {viewModal.document?.created_at}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    تاريخ الانتهاء
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {viewModal.document?.expired_at}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  الموضوع
                </label>
                <div className="p-3 bg-gray-50 rounded-lg font-medium">
                  {viewModal.document?.subject}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  الوصف
                </label>
                <div className="p-3 bg-gray-50 rounded-lg min-h-[100px]">
                  {viewModal.document?.description}
                </div>
              </div>

              {viewModal.document?.closed_at && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    تاريخ الإغلاق
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {viewModal.document.closed_at}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Fixed */}
            <div className="p-6 border-t border-gray-200 flex justify-end flex-shrink-0">
              <button
                onClick={() => setViewModal({ isOpen: false, document: null })}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setEditModal({ isOpen: false, document: null })}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <EditModal
              document={editModal.document}
              onSave={saveEdit}
              onClose={() => setEditModal({ isOpen: false, document: null })}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setDeleteModal({ isOpen: false, document: null })}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-100 p-3 rounded-xl">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    حذف الوثيقة
                  </h2>
                  <p className="text-gray-500">
                    هذا الإجراء لا يمكن التراجع عنه
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-medium">
                  هل أنت متأكد من حذف الوثيقة{" "}
                  <span className="font-bold">
                    {deleteModal.document?.document_number}
                  </span>
                  ؟
                </p>
                <p className="text-red-600 text-sm mt-2">
                  الموضوع: {deleteModal.document?.subject}
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() =>
                    setDeleteModal({ isOpen: false, document: null })
                  }
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => confirmDelete(deleteModal.document)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              {toast.type === "success" ? (
                <CheckCircle size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
            </div>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Edit Modal Component
const EditModal = ({ document, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    subject: document?.subject || "",
    description: document?.description || "",
    created_at: document?.created_at || "",
    expired_at: document?.expired_at || "",
    closed_at: document?.closed_at || "",
  });

  // Update form data when document changes
  useEffect(() => {
    if (document) {
      setFormData({
        subject: document.subject || "",
        description: document.description || "",
        created_at: document.created_at || "",
        expired_at: document.expired_at || "",
        closed_at: document.closed_at || "",
      });
    }
  }, [document]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDocument = {
      ...document,
      ...formData,
    };
    onSave(updatedDocument);
  };

  return (
    <>
      {/* Header - Fixed */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 rounded-t-2xl flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Edit className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">تعديل الوثيقة</h2>
              <p className="text-primary-100">{document?.document_number}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Body - Scrollable */}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 overflow-y-auto flex-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              تاريخ الإنشاء
            </label>
            <input
              type="date"
              value={formData.created_at}
              onChange={(e) =>
                setFormData({ ...formData, created_at: e.target.value })
              }
              className="input-field"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              تاريخ الانتهاء
            </label>
            <input
              type="date"
              value={formData.expired_at}
              onChange={(e) =>
                setFormData({ ...formData, expired_at: e.target.value })
              }
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">الموضوع</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="input-field"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">الوصف</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="input-field min-h-[120px] resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            تاريخ الإغلاق (اختياري)
          </label>
          <input
            type="date"
            value={formData.closed_at}
            onChange={(e) =>
              setFormData({ ...formData, closed_at: e.target.value })
            }
            className="input-field"
          />
        </div>
      </form>

      {/* Footer - Fixed */}
      <div className="p-6 border-t border-gray-200 flex gap-3 justify-end flex-shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          إلغاء
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Save size={16} />
          حفظ التغييرات
        </button>
      </div>
    </>
  );
};

export default DepartmentPage;
