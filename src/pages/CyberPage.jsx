import DepartmentPage from "./DepartmentPage";
import { cyber } from "../data/cyber";

const CyberPage = () => {
  const department = cyber[0];
  return <DepartmentPage department={department} />;
};

export default CyberPage;
