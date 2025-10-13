import DepartmentPage from "./DepartmentPage";
import { departments } from "../data/mockData";

const LawPage = () => {
  const department = departments.find(
    (d) => d.dept_name === "Law and Governance"
  );
  return <DepartmentPage department={department} />;
};

export default LawPage;
