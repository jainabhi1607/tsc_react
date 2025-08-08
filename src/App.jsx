import { createRoot } from 'react-dom/client'
import Login from "./Pages/Login.jsx"
import Home from "./Pages/Home.jsx"
import CreateAccount from "./Pages/CreateAccount.jsx"
import Service from './Pages/Service.jsx'
import CompletedService from './Pages/CompletedService.jsx'
import First from './Pages/First.jsx'
import './bootstrap.min.css'
import './Css/Style.css'
import './Css/Dev.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First/>,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path: "/login",
        element: < Login/>
      },
      {
        path: "/createaccount/:id",
        element: < CreateAccount/>
      },
      {
        path: "/service",
        element: < Service/>
      },
      {
        path: "/completed",
        element: < CompletedService/>
      }
    ],
  }
])

function App() {
  return (
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  );
}

export default App;