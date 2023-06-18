import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import Dashboard from './components/Dashboard/Dashboard';
import Fts from './components/fts/Fts';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Playground from './pages/Playground';

interface IApp {
  pageTitle?: string;
}
function App(props: IApp) {
  console.log(process.env);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard title={props.pageTitle} />}>
          <Route index element={<Home />} />
          <Route path="playground" element={<Playground />} />
          <Route path="playground/fts" element={<Fts />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
