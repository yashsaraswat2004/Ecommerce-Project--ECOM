import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRoute from "./routes/CustomerRoute";
import AdminRoute from "./routes/AdminRoute";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/*" element={<CustomerRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
