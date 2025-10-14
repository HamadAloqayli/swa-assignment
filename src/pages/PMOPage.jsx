import DepartmentPage from "./DepartmentPage";
import { pmo } from "../data/pmo";
import { Briefcase } from "lucide-react";

const PMOPage = () => {
  const department = pmo[0];
  return <DepartmentPage department={department} icon={Briefcase} />;
};

export default PMOPage;
