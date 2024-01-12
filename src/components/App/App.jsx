import Header from "@components/Header";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100">
      <Router>
        <Header />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </Router>
    </div>
  );
}

export default App;
