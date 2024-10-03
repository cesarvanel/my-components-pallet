import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { FormPage } from "../pages/form/form";
import Contact from "../pages/contact/Contact";
import AnimationPage from "../pages/animation/Animation";
import { AppLayout } from "../components/layouts/app-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/tab1",
        element: (
          <div style={{backgroundColor:"black"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit</div>
        ),
      },

      {
        path: "/tab2",
        element: (
          <div style={{backgroundColor:"black"}}>
            Fuga vitae assumenda non blanditiis provident amet, qui ad corporis,
            sapiente.
          </div>
        ),
      },

      {
        path: "/tab3",
        element: (
          <div style={{backgroundColor:"black"}}>
            temporibus exercitationem vel quas tempora magnam facilis
            consectetur quibusdam mollitia mod
          </div>
        ),
      },
    ],
  },

  {
    path:"/form", 
    element:<FormPage />

  }, 
  {
    path:"/contact", 
    element:<Contact />
  }, 

  {
    path:"/animation", 
    element:<AnimationPage />
  }
]);
