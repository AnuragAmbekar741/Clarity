import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/router";
import "./global.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
