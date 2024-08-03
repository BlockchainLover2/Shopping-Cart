import App from "./App.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ShopPage from "./Pages/ShopPage.jsx";

const routes= [
    {
        path:"/",
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "home", element: <HomePage /> },
            { path: "shop", element: <ShopPage /> },
        ],


    },

]

export default routes