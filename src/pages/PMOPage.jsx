import DepartmentPage from "./DepartmentPage";
import { departments } from "../data/mockData";

const PMOPage = () => {
  const department = departments.find((d) => d.dept_name === "PMO");
  return <DepartmentPage department={department} />;
};

export default PMOPage;
