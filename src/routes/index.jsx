import App from "containers/App/App.jsx";
import Home from "views/Home/Home.jsx"

const indexRoutes = [{path: "/", component: App},
                     {path: "/home", component: Home},
                     {redirect: true, path: "/inicio", to: "/home", navbarName: "Redirect" }]; //aca se puede agregar otro objeto para crear otra app

export default indexRoutes;
