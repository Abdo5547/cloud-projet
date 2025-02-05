import { Outlet } from "react-router-dom";
import AppAppBar from "../components/AppAppBar/AppAppBar";
import Footer from "../components/footer/Footer";
import SetQuestion from "../pages/Question/Publier/SetQuestion";

function RootLayout2() {
  return (
    <>
      <AppAppBar/>
      <Outlet />
    </>
  );
}
export default RootLayout2;
