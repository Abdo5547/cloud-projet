import { Outlet } from 'react-router-dom';
import AppAppBar from '../components/AppAppBar/AppAppBar';
//import Footer from '../components/footer/Footer';

function RootLayout() {
return (
    <>
    <AppAppBar/>
      <Outlet />
      <Footer />
    </>

);
}
export default RootLayout;