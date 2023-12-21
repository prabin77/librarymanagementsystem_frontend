import axioInstance from "./axios.config"

class HttpService{
_headers={}

setHeaders=(config)=>{
    if(config.file){
        this._headers={
            "Content-Type":"multipart/form-data"
        }
    }

    if(config.auth){
        let token = localStorage.getItem('token');
        if(!token){
            throw new Error("user not logged in!!!")
        }
        this._headers={
            ...this._headers,
            "Authorization":"Bearer "+token
        }
        if(config.query){
            this._headers={
                ...this._headers,
                "Params":config.query
            }
        }

    }
}

getRequest= async (url,config={})=>{
    try{
        this.setHeaders(config);
        let response = await axioInstance.get(
            url,
            {
                headers:this._headers
            }
        )
        return response
    }catch(exception){
        throw exception
    }
}

postRequest= async (url,data={},config={})=>{
    try{
        this.setHeaders(config);
        let response = await axioInstance.post(
            url,
            data,
            {
                headers:this._headers
            }
        )
        return response
    }catch(exception){
        
        throw exception
    }
}
putRequest= async (url,data={},config={})=>{
 try{
        this.setHeaders(config);
        

        let response = await axioInstance.put(
            url,
            data,
            {
                headers:this._headers
            }
        )
        
        return response
    }catch(exception){
        throw exception
    }
}
deleteRequest= async (url,config={})=>{
    try{
        this.setHeaders(config);
        let response = await axioInstance.delete(
            url,
            {
                headers:this._headers
            }
        )
        return response
    }catch(exception){
        throw exception
    }
}
}
export default HttpService;