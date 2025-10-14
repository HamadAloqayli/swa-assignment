import DepartmentPage from "./DepartmentPage";
import { finance } from "../data/finance";
import { DollarSign } from "lucide-react";

const FinancePage = () => {
  const department = finance[0];
  return <DepartmentPage department={department} icon={DollarSign} />;
};

export default FinancePage;
