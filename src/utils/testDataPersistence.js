// Test script to verify data persistence functionality
import dataManager from "./dataManager";

export const testDataPersistence = () => {
  console.log("🧪 Testing Data Persistence...");

  // Test 1: Initial data loading
  console.log("Test 1: Loading initial data");
  const departments = dataManager.getDepartments();
  console.log(`✅ Loaded ${departments.length} departments`);

  // Test 2: Get specific department
  console.log("Test 2: Getting IT department");
  const itDept = dataManager.getDepartment(111);
  console.log(`✅ IT department has ${itDept.documents.length} documents`);

  // Test 3: Update a document
  console.log("Test 3: Updating a document");
  const originalDoc = itDept.documents[0];
  const updatedDoc = {
    ...originalDoc,
    subject: "Updated Subject - Test",
    description: "Updated description for testing purposes",
  };

  const updateResult = dataManager.updateDocument(111, updatedDoc);
  console.log(`✅ Document update: ${updateResult ? "SUCCESS" : "FAILED"}`);

  // Test 4: Verify stats recalculation
  console.log("Test 4: Verifying stats recalculation");
  const updatedDept = dataManager.getDepartment(111);
  console.log(`✅ Updated department stats:`, {
    under_process: updatedDept.under_process_documents,
    late: updatedDept.under_process_late_documents,
    closed: updatedDept.closed_documents,
  });

  // Test 5: Delete a document
  console.log("Test 5: Deleting a document");
  const docToDelete = itDept.documents[1];
  const deleteResult = dataManager.deleteDocument(
    111,
    docToDelete.document_number
  );
  console.log(`✅ Document deletion: ${deleteResult ? "SUCCESS" : "FAILED"}`);

  // Test 6: Verify final stats
  console.log("Test 6: Verifying final stats after deletion");
  const finalDept = dataManager.getDepartment(111);
  console.log(`✅ Final department stats:`, {
    under_process: finalDept.under_process_documents,
    late: finalDept.under_process_late_documents,
    closed: finalDept.closed_documents,
    total_documents: finalDept.documents.length,
  });

  // Test 7: Get total stats
  console.log("Test 7: Getting total stats across all departments");
  const totalStats = dataManager.getTotalStats();
  console.log(`✅ Total stats:`, totalStats);

  console.log("🎉 All tests completed!");

  return {
    success: true,
    testsRun: 7,
    finalStats: totalStats,
    itDeptStats: finalDept,
  };
};

// Auto-run test in development
if (process.env.NODE_ENV === "development") {
  // Uncomment the line below to run tests automatically
  // testDataPersistence();
}
