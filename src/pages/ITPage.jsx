import DepartmentPage from "./DepartmentPage";
import { it } from "../data/it";

const ITPage = () => {
  const department = it[0];
  console.log(department);
  return <DepartmentPage department={department} />;
};

export default ITPage;
