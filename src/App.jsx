import { createRoot } from 'react-dom/client'
import Login from "./Pages/Login.jsx"
import Home from "./Pages/Home.jsx"
import CreateAccount from "./Pages/CreateAccount.jsx"
import Service from './Pages/Service.jsx'
import CompletedService from './Pages/CompletedService.jsx'
import ClientView from './Pages/Supports/ClientView.jsx'
import ServiceClientView from './Pages/Services/ClientView.jsx'
import Sites from './Pages/Clients/Sites.jsx'
import ViewSite from './Pages/Clients/ViewSite.jsx'
import SiteAssets from './Pages/Clients/SiteAssets.jsx'
import SiteContacts from './Pages/Clients/SiteContacts.jsx'
import First from './Pages/First.jsx'
import './bootstrap.min.css'
import './Css/Style.css'
import './Css/Dev.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import Support from './Pages/Support.jsx'

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
      },
      {
        path: "/service_client_view/:edit/:userId/:id/:first",
        element: < ServiceClientView/>
      },
      {
        path: "/support",
        element: < Support/>
      },
      {
        path: "/support_client_view/:id",
        element: < ClientView/>
      },
      {
        path: "/clients/sites",
        element: < Sites/>
      },
      {
        path: "/clients/view_site/:edit/:userId/:id/:first",
        element: < ViewSite/>
      },
      {
        path: "/clients/site_assets/:edit/:userId/:id/:first",
        element: < SiteAssets/>
      },
      {
        path: "/clients/site_contacts/:edit/:userId/:id/:first",
        element: < SiteContacts/>
      },
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