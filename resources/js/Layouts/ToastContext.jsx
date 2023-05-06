import { createContext } from "react";

//createContext is used to pass data through the component tree without having to pass props
// or to share data that can be considered “global”  for components
 const ToastContext = createContext({
    showToast: false,
    toastType :"",
    message: "",
    handleToast: () =>{}

});

export default  ToastContext