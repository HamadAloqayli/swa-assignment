import { useState, useEffect, useCallback } from "react";
import dataManager from "../utils/dataManager";

export const useDataManager = () => {
  const [data, setData] = useState(dataManager.getDepartments());
  const [loading, setLoading] = useState(false);

  // Subscribe to data changes
  useEffect(() => {
    const unsubscribe = dataManager.subscribe((newData) => {
      setData(newData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Update department documents
  const updateDepartmentDocuments = useCallback((deptNo, documents) => {
    setLoading(true);
    return dataManager.updateDepartmentDocuments(deptNo, documents);
  }, []);

  // Delete document
  const deleteDocument = useCallback((deptNo, documentNumber) => {
    setLoading(true);
    return dataManager.deleteDocument(deptNo, documentNumber);
  }, []);

  // Update document
  const updateDocument = useCallback((deptNo, updatedDocument) => {
    setLoading(true);
    return dataManager.updateDocument(deptNo, updatedDocument);
  }, []);

  // Add document
  const addDocument = useCallback((deptNo, newDocument) => {
    setLoading(true);
    return dataManager.addDocument(deptNo, newDocument);
  }, []);

  // Get department by dept_no
  const getDepartment = useCallback((deptNo) => {
    return dataManager.getDepartment(deptNo);
  }, []);

  // Get department by name
  const getDepartmentByName = useCallback((deptName) => {
    return dataManager.getDepartmentByName(deptName);
  }, []);

  // Get total stats
  const getTotalStats = useCallback(() => {
    return dataManager.getTotalStats();
  }, []);

  // Reset data
  const resetData = useCallback(() => {
    setLoading(true);
    dataManager.resetData();
  }, []);

  // Export data
  const exportData = useCallback(() => {
    return dataManager.exportData();
  }, []);

  // Import data
  const importData = useCallback((jsonData) => {
    setLoading(true);
    return dataManager.importData(jsonData);
  }, []);

  return {
    data,
    loading,
    updateDepartmentDocuments,
    deleteDocument,
    updateDocument,
    addDocument,
    getDepartment,
    getDepartmentByName,
    getTotalStats,
    resetData,
    exportData,
    importData,
  };
};
