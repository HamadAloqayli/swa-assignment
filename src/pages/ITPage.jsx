import DepartmentPage from "./DepartmentPage";
import { departments } from "../data/mockData";

const ITPage = () => {
  const department = departments.find((d) => d.dept_name === "IT");
  return <DepartmentPage department={department} />;
};

export default ITPage;
