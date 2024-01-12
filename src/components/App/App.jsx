import About from "@components/About/About";
import Demo from "@components/Demo/Demo";
import Header from "@components/Header/Header";
import PageNotFound from "@components/PageNotFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Redirect from "./Redirect.hook";

function App() {
  return (
    <div className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-50">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Redirect path="/demo" />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
