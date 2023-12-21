import axios from "axios";
import { toast } from "react-toastify";


const axioInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    timeoutErrorMessage:"Server timeout",
    headers:{
        "Accept":'application/json',
        'Content-Type': 'application/json'
    }
})

axioInstance.interceptors.response.use(
    (success)=>{
        return success;
    },
    (reject)=>{
        if(reject.response.status===401){
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("refreshtoken")

            toast.error("Please login first")
            window.location.href="/login";
        }
        throw reject?.response;
    }

)
export default axioInstance;