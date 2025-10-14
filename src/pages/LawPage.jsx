import DepartmentPage from "./DepartmentPage";
import { law } from "../data/law";

const LawPage = () => {
  const department = law[0];
  return <DepartmentPage department={department} />;
};

export default LawPage;
