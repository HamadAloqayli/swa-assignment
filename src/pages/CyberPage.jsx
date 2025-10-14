import DepartmentPage from "./DepartmentPage";
import { cyber } from "../data/cyber";
import { Shield } from "lucide-react";

const CyberPage = () => {
  const department = cyber[0];
  return <DepartmentPage department={department} icon={Shield} />;
};

export default CyberPage;
