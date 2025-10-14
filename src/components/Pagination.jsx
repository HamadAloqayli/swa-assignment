import { ChevronRight, ChevronLeft } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (totalItems === 0) return null;

  return (
    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="text-sm text-gray-600">
          عرض <span className="font-semibold">{startIndex + 1}</span> إلى{" "}
          <span className="font-semibold">
            {Math.min(endIndex, totalItems)}
          </span>{" "}
          من <span className="font-semibold">{totalItems}</span> وثيقة
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-300"
            }`}
          >
            <ChevronRight size={18} />
            السابق
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first, last, current, and adjacent pages
              if (
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                      currentPage === page
                        ? "bg-primary-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-primary-50 border border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 py-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-300"
            }`}
          >
            التالي
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
