import { BrowserRouter , Routes ,Route,Link } from "react-router-dom";
import { useState } from "react";
import CompaniesIndex from "../Pages/Companies/Index";
import CompaniesCreate from "../Pages/Companies/Create";
import CompaniesEdit from "../Pages/Companies/Edit";
import ToastContext from "./ToastContext";

function App() {
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const [message, setMessage] = useState('');
  
    const handleToast = (type, message) => {
      setToastType(type);
      setMessage(message);
      setShowToast(true);
    };
    return (
        //wrapping toast in main layout for performance
        <ToastContext.Provider value={{ showToast, toastType, message ,handleToast }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<CompaniesIndex />}></Route>
                    <Route path="/companies/create" element={<CompaniesCreate />}></Route>
                    <Route path="/companies/edit/:id" element={<CompaniesEdit />}></Route>

                </Routes>
            </BrowserRouter>
        </ToastContext.Provider>
       
    );
}
export default App;