import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Paste from "../components/Paste";
import Navbar from "../components/Navbar";
import ViewPaste from "../components/ViewPaste";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/pastes"
          element={
            <>
              <Navbar />
              <Paste />
            </>
          }
        />

        <Route
          path="/paste/:id"
          element={
            <>
              <Navbar />
              <ViewPaste />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
