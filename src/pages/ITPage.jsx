import DepartmentPage from "./DepartmentPage";
import { it } from "../data/it";
import { Monitor } from "lucide-react";

const ITPage = () => {
  const department = it[0];
  return <DepartmentPage department={department} icon={Monitor} />;
};

export default ITPage;
