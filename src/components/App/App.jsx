import About from "@components/About";
import Demo from "@components/Demo";
import Header from "@components/Header";
import PageNotFound from "@components/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Redirect from "./Redirect.hook";

function App() {
  return (
    <div className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100">
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
