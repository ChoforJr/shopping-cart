import App from "./App Components/App";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/:name?",
    element: <App />,
    // This is a catch-all for errors that occur within the <App /> component or its children.
    errorElement: <ErrorPage />,
  },
];

export default routes;
