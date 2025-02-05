import { Outlet } from "react-router-dom";
import AppAppBar from "../components/AppAppBar/AppAppBar";
import Footer from "../components/footer/Footer";
import SetQuestion from "../pages/Question/Publier/SetQuestion";
import MyProfile from "../pages/UserProfilePage/ProfilePage";
import ProfileUser from "../pages/NoraleProfile/ProfileUser";

function RootLayoutProfile() {
  return (
    <>
      <ProfileUser />
      <Outlet />
    </>
  );
}
export default RootLayoutProfile;
