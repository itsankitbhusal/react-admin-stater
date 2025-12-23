import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const routes = [{
    path: "/",
    element: <Home />,
},
{
    path: "*",
    element: <NotFound />
}]

export default routes;