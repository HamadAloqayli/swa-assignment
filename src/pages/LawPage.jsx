import DepartmentPage from "./DepartmentPage";
import { law } from "../data/law";
import { Scale } from "lucide-react";

const LawPage = () => {
  const department = law[0];
  return <DepartmentPage department={department} icon={Scale} />;
};

export default LawPage;
