import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { FormPage } from "../pages/form/form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

  }
]);
