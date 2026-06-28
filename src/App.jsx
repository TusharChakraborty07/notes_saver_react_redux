import React from "react";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <AppRouter />
      <Toaster />
    </div>
  );
};

export default App;
