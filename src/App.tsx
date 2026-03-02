import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Toaster />  
    </>
  )
}

