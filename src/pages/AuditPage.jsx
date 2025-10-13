import DepartmentPage from "./DepartmentPage";
import { departments } from "../data/mockData";

const AuditPage = () => {
  const department = departments.find((d) => d.dept_name === "Internal Audit");
  return <DepartmentPage department={department} />;
};

export default AuditPage;
