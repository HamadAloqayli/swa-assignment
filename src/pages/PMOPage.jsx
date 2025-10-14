import DepartmentPage from "./DepartmentPage";
import { pmo } from "../data/pmo";

const PMOPage = () => {
  const department = pmo[0];
  return <DepartmentPage department={department} />;
};

export default PMOPage;
