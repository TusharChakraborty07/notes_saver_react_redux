import React from "react";
import { createBrowserRouter } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <div></div> },
    { path: "/pastes", element: <div></div> },
  ]);

  return <div>App</div>;
};

export default App;
