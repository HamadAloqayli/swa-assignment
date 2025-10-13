import DepartmentPage from "./DepartmentPage";
import { departments } from "../data/mockData";

const FinancePage = () => {
  const department = departments.find((d) => d.dept_name === "Finance");
  return <DepartmentPage department={department} />;
};

export default FinancePage;
