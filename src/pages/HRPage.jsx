import DepartmentPage from "./DepartmentPage";
import { hr } from "../data/hr";
import { Users } from "lucide-react";

const HRPage = () => {
  const department = hr[0];
  return <DepartmentPage department={department} icon={Users} />;
};

export default HRPage;
