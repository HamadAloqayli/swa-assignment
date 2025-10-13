import DepartmentPage from "./DepartmentPage";
import { departments } from "../data/mockData";

const HRPage = () => {
  const department = departments.find((d) => d.dept_name === "HR");
  return <DepartmentPage department={department} />;
};

export default HRPage;
