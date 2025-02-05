import react from "react";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "../Pages/Sign/SignUp";
import SignIn from "../Pages/Sign/SignIn";
import SignInAdmin from "../Pages/Sign/SignInAdmin";
import DashProfile from "../Pages/dashprofile/DashProfile";
import UpdateProfile from "../Pages/dashprofile/components/UpdateProfile";
import DashUpdateProfile from "../Pages/dashprofile/DashUpdateProfile";
import DashPayment from "../Pages/dashpayment/DashPayment";
import DashResident from "../Pages/dashresident/DashResident";
import DashTechnicien from "../Pages/dashtechnicien/DashTechnicien";
import DashAddAdmin from "../Pages/dashprofile/addadmin/DashAddAdmin";
import DashIncident from "../Pages/dashIncident/DashIncident";
import Dashnotification from "../Pages/dashnotification/DashNotification";
import DashStatistique from "../Pages/dashstatistique/DashStatistique";
import DashChambre from "../Pages/dashchambre/DashChambre";
import DashDetailsChambre from "../Pages/dashchambreDetails/DashDetailChambre";
import DashUpdateChambre from "../Pages/dashchambreDetails/updatechambre/DashUpdateChambre";
import MainPage from "../Pages/Home/MainPage";
import PageResident from "../Pages/Home/pageHome/PageResident";
import Resident from "../Pages/Home/pageHome/AppAppBar/ResidentProfile";
import Etap1 from "../Pages/payment/Etap1";
import Etap2 from "../Pages/payment/Etap2";
import Etap3 from "../Pages/payment/Etap3";
import Etap4 from "../Pages/payment/Etap4";

export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/payment1", element: <Etap1 /> },
  { path: "/payment2", element: <Etap2 /> },
  { path: "/payment3", element: <Etap3 /> },
  { path: "/payment4", element: <Etap4 /> },

  { path: "/resident", element: <Resident /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/SignInAdmin", element: <SignInAdmin /> },
  { path: "/dashpayment", element: <DashPayment /> },
  { path: "/dashrooms", element: <DashChambre /> },
  { path: "/dashresidents", element: <DashResident /> },
  { path: "/dashprofile", element: <DashProfile /> },
  { path: "/dashupdateprofile", element: <DashUpdateProfile /> },
  { path: "/dashtechnicien", element: <DashTechnicien /> },
  { path: "/dashaddadmin", element: <DashAddAdmin /> },
  { path: "/dashincident", element: <DashIncident /> },
  { path: "/dashnotification", element: <Dashnotification /> },
  { path: "/dashstatistiques", element: <DashStatistique /> },
  { path: `/dashrooms/detailroom/:id`, element: <DashDetailsChambre /> },
  { path: `/dashrooms/detailroom/:id/update`, element: <DashUpdateChambre /> },

  // { path: "/ForgetPassword", element: <ForgetPassword /> },
]);
