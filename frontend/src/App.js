import SignIn from "./Pages/Sign/SignIn";
import SignUp from "./Pages/Sign/SignUp";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { router } from "./Routes/route";
import { RouterProvider } from "react-router-dom";






function App() {
  return (
    
    <>
    <RouterProvider router={router} />
     </>
    


    
   
  );
}

export default App;
