import DepartmentPage from "./DepartmentPage";
import { audit } from "../data/audit";
import { FileCheck } from "lucide-react";

const AuditPage = () => {
  const department = audit[0];
  return <DepartmentPage department={department} icon={FileCheck} />;
};

export default AuditPage;
