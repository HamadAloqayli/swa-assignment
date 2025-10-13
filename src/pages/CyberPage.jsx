import DepartmentPage from "./DepartmentPage";
import { departments } from "../data/mockData";

const CyberPage = () => {
  const department = departments.find((d) => d.dept_name === "Cyber Security");
  return <DepartmentPage department={department} />;
};

export default CyberPage;
