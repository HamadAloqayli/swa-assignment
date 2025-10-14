import DepartmentPage from "./DepartmentPage";
import { hr } from "../data/hr";

const HRPage = () => {
  const department = hr[0];
  return <DepartmentPage department={department} />;
};

export default HRPage;
