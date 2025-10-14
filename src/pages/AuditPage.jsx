import DepartmentPage from "./DepartmentPage";
import { audit } from "../data/audit";

const AuditPage = () => {
  const department = audit[0];
  return <DepartmentPage department={department} />;
};

export default AuditPage;
