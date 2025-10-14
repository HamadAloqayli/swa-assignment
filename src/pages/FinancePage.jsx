import DepartmentPage from "./DepartmentPage";
import { finance } from "../data/finance";

const FinancePage = () => {
  const department = finance[0];
  return <DepartmentPage department={department} />;
};

export default FinancePage;
