import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// import { StrictMode } from "react"
// import { createRoot } from "react-dom/client"
// import { BrowserRouter, Route } from "react-router"
// import "./styles.css"

// import Game from "./components/game/game"
// import About from "./components/about/about"
// import Layout from "./components/layout/layout"

// const root = createRoot(document.getElementById("root"))
// root.render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="*" element={<Layout />}>
//           <Route index element={<Game />} />
//           <Route path="/about" element={<About />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>,
//   </StrictMode>
// );