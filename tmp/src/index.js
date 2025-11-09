import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from './store.js'


import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
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