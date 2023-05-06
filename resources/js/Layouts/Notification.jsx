
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = (props) => {
    const status = props.status;
    const message = props.message;
    // console.log('status',status,message)
    
    switch (status) {
        case 'success':
          toast.success(message);
          break;
        case 'error':
          toast.error(message);
          break;
        case 'warning':
          toast.warning(message);
          break;
        default:
          toast.info(message);
          break;
      }

    return(
        <div>
            <ToastContainer/> 
        </div>
    );
}
export default Notification;