import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';
import Dashboard from './components/Dashboard/Dashboard';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import Playground from './pages/Playground';

interface IApp {
  pageTitle?: string;
}
function App(props: IApp) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard title={props.pageTitle} />}>
          <Route index element={<Home />} />
          <Route path="playground" element={<Playground />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
