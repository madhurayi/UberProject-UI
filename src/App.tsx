import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
