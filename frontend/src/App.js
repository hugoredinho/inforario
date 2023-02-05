import React, { Component, Fragment } from "react";
import { Authenticator} from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { RequireAuth } from "./components/RequireAuth";
import { Login } from "./components/Login";
import awsExports from './aws-exports';
import PaginaTempo from "./components/PaginaTempo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";

Amplify.configure(awsExports);


function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}/>

        <Route 
        path="/Login" 
        element={<Login />} />

        <Route 
        path="/PaginaTempo" 
        element={
          <RequireAuth>
        <PaginaTempo />
        </RequireAuth>} />


      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}

export default App;
