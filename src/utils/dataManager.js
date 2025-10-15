import { it } from "../data/it";
import { hr } from "../data/hr";
import { finance } from "../data/finance";
import { law } from "../data/law";
import { pmo } from "../data/pmo";
import { cyber } from "../data/cyber";
import { audit } from "../data/audit";

// Storage key for localStorage
const STORAGE_KEY = "swa_documents_data";

// Initial data from all departments
const initialData = [
  it[0],
  hr[0],
  finance[0],
  law[0],
  pmo[0],
  cyber[0],
  audit[0],
];

class DataManager {
  constructor() {
    this.data = this.loadData();
    this.listeners = [];
  }

  // Load data from localStorage or use initial data
  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn("Failed to load data from localStorage:", error);
    }

    // Save initial data to localStorage
    this.saveData(initialData);
    return initialData;
  }

  // Save data to localStorage
  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to save data to localStorage:", error);
    }
  }

  // Get all departments data
  getDepartments() {
    return this.data;
  }

  // Get specific department by dept_no
  getDepartment(deptNo) {
    return this.data.find((dept) => dept.dept_no === deptNo);
  }

  // Get specific department by name
  getDepartmentByName(deptName) {
    return this.data.find((dept) => dept.dept_name === deptName);
  }

  // Update department documents
  updateDepartmentDocuments(deptNo, documents) {
    const departmentIndex = this.data.findIndex(
      (dept) => dept.dept_no === deptNo
    );

    if (departmentIndex === -1) {
      console.warn(`Department with dept_no ${deptNo} not found`);
      return false;
    }

    // Create new department object with new documents array
    const updatedDepartment = {
      ...this.data[departmentIndex],
      documents: [...documents],
    };

    // Recalculate stats for the updated department
    const underProcess = documents.filter((doc) => {
      if (doc.closed_at) return false;
      const expiredDate = new Date(doc.expired_at);
      return expiredDate >= new Date();
    }).length;

    const late = documents.filter((doc) => {
      if (doc.closed_at) return false;
      const expiredDate = new Date(doc.expired_at);
      return expiredDate < new Date();
    }).length;

    const closed = documents.filter((doc) => doc.closed_at).length;

    updatedDepartment.under_process_documents = underProcess;
    updatedDepartment.under_process_late_documents = late;
    updatedDepartment.closed_documents = closed;

    // Create completely new data array with updated department
    this.data = [
      ...this.data.slice(0, departmentIndex),
      updatedDepartment,
      ...this.data.slice(departmentIndex + 1),
    ];

    // Save to localStorage
    this.saveData(this.data);

    // Notify listeners
    this.notifyListeners();

    return true;
  }

  // Delete document from department
  deleteDocument(deptNo, documentNumber) {
    const departmentIndex = this.data.findIndex(
      (dept) => dept.dept_no === deptNo
    );

    if (departmentIndex === -1) {
      console.warn(`Department with dept_no ${deptNo} not found`);
      return false;
    }

    // Remove document
    const originalLength = this.data[departmentIndex].documents.length;
    const updatedDocuments = this.data[departmentIndex].documents.filter(
      (doc) => doc.document_number !== documentNumber
    );

    if (updatedDocuments.length === originalLength) {
      console.warn(
        `Document ${documentNumber} not found in department ${deptNo}`
      );
      return false;
    }

    // Create new department object with new documents array
    const updatedDepartment = {
      ...this.data[departmentIndex],
      documents: updatedDocuments,
    };

    // Recalculate stats for the updated department
    const underProcess = updatedDocuments.filter((doc) => {
      if (doc.closed_at) return false;
      const expiredDate = new Date(doc.expired_at);
      return expiredDate >= new Date();
    }).length;

    const late = updatedDocuments.filter((doc) => {
      if (doc.closed_at) return false;
      const expiredDate = new Date(doc.expired_at);
      return expiredDate < new Date();
    }).length;

    const closed = updatedDocuments.filter((doc) => doc.closed_at).length;

    updatedDepartment.under_process_documents = underProcess;
    updatedDepartment.under_process_late_documents = late;
    updatedDepartment.closed_documents = closed;

    // Create completely new data array with updated department
    this.data = [
      ...this.data.slice(0, departmentIndex),
      updatedDepartment,
      ...this.data.slice(departmentIndex + 1),
    ];

    // Save to localStorage
    this.saveData(this.data);

    // Notify listeners
    this.notifyListeners();

    return true;
  }

  // Update document in department
  updateDocument(deptNo, updatedDocument) {
    const departmentIndex = this.data.findIndex(
      (dept) => dept.dept_no === deptNo
    );

    if (departmentIndex === -1) {
      console.warn(`Department with dept_no ${deptNo} not found`);
      return false;
    }

    // Update document
    const documentIndex = this.data[departmentIndex].documents.findIndex(
      (doc) => doc.document_number === updatedDocument.document_number
    );

    if (documentIndex === -1) {
      console.warn(
        `Document ${updatedDocument.document_number} not found in department ${deptNo}`
      );
      return false;
    }

    // Create new documents array with updated document to ensure React detects changes
    const updatedDocuments = [...this.data[departmentIndex].documents];
    updatedDocuments[documentIndex] = updatedDocument;

    // Create new department object with new documents array
    const updatedDepartment = {
      ...this.data[departmentIndex],
      documents: updatedDocuments,
    };

    // Recalculate stats for the updated department
    const underProcess = updatedDocuments.filter((doc) => {
      if (doc.closed_at) return false;
      const expiredDate = new Date(doc.expired_at);
      return expiredDate >= new Date();
    }).length;

    const late = updatedDocuments.filter((doc) => {
      if (doc.closed_at) return false;
      const expiredDate = new Date(doc.expired_at);
      return expiredDate < new Date();
    }).length;

    const closed = updatedDocuments.filter((doc) => doc.closed_at).length;

    updatedDepartment.under_process_documents = underProcess;
    updatedDepartment.under_process_late_documents = late;
    updatedDepartment.closed_documents = closed;

    // Create completely new data array with updated department
    this.data = [
      ...this.data.slice(0, departmentIndex),
      updatedDepartment,
      ...this.data.slice(departmentIndex + 1),
    ];

    // Save to localStorage
    this.saveData(this.data);

    // Notify listeners
    this.notifyListeners();

    return true;
  }

  // Add new document to department
  addDocument(deptNo, newDocument) {
    const departmentIndex = this.data.findIndex(
      (dept) => dept.dept_no === deptNo
    );

    if (departmentIndex === -1) {
      console.warn(`Department with dept_no ${deptNo} not found`);
      return false;
    }

    // Check if document number already exists
    const existingDoc = this.data[departmentIndex].documents.find(
      (doc) => doc.document_number === newDocument.document_number
    );

    if (existingDoc) {
      console.warn(
        `Document ${newDocument.document_number} already exists in department ${deptNo}`
      );
      return false;
    }

    // Add document
    const updatedDocuments = [
      ...this.data[departmentIndex].documents,
      newDocument,
    ];

    // Create new department object with new documents array
    const updatedDepartment = {
      ...this.data[departmentIndex],
      documents: updatedDocuments,
    };

    // Recalculate stats for the updated department
    const underProcess = updatedDocuments.filter((doc) => {
      if (doc.closed_at) return false;
      const expiredDate = new Date(doc.expired_at);
      return expiredDate >= new Date();
    }).length;

    const late = updatedDocuments.filter((doc) => {
      if (doc.closed_at) return false;
      const expiredDate = new Date(doc.expired_at);
      return expiredDate < new Date();
    }).length;

    const closed = updatedDocuments.filter((doc) => doc.closed_at).length;

    updatedDepartment.under_process_documents = underProcess;
    updatedDepartment.under_process_late_documents = late;
    updatedDepartment.closed_documents = closed;

    // Create completely new data array with updated department
    this.data = [
      ...this.data.slice(0, departmentIndex),
      updatedDepartment,
      ...this.data.slice(departmentIndex + 1),
    ];

    // Save to localStorage
    this.saveData(this.data);

    // Notify listeners
    this.notifyListeners();

    return true;
  }

  // Get total statistics across all departments
  getTotalStats() {
    return this.data.reduce(
      (acc, dept) => ({
        underProcess: acc.underProcess + dept.under_process_documents,
        late: acc.late + dept.under_process_late_documents,
        closed: acc.closed + dept.closed_documents,
      }),
      { underProcess: 0, late: 0, closed: 0 }
    );
  }

  // Subscribe to data changes
  subscribe(listener) {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of data changes
  notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.data);
      } catch (error) {
        console.warn("Error in data change listener:", error);
      }
    });
  }

  // Reset data to initial state
  resetData() {
    this.data = [...initialData];
    this.saveData(this.data);
    this.notifyListeners();
  }

  // Export data
  exportData() {
    return JSON.stringify(this.data, null, 2);
  }

  // Import data
  importData(jsonData) {
    try {
      const importedData = JSON.parse(jsonData);

      // Validate data structure
      if (Array.isArray(importedData) && importedData.length > 0) {
        this.data = importedData;

        // Recalculate all stats
        this.data.forEach((_, index) => {
          this.recalculateDepartmentStats(index);
        });

        this.saveData(this.data);
        this.notifyListeners();
        return true;
      }
    } catch (error) {
      console.error("Failed to import data:", error);
    }

    return false;
  }
}

// Create singleton instance
const dataManager = new DataManager();

export default dataManager;
