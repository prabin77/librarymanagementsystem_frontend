import HttpService from "../../config/http.service";

class UserService extends HttpService{
    createUser= async(data)=>{
        try{

            let response = await this.postRequest("v1/user",data, {auth:true,file:true})
            return response
        }catch(exception){
            throw exception
        }
    }
listUser= async(perPage,page)=>{
   try{
     let response = await this.getRequest("v1/user?perPage="+perPage+"&page="+page,
    {auth:true}
    )
    return response
}catch(exception){
    throw exception;
}
}   
deleteById= async(id)=>{
    try{
        let response = await this.deleteRequest("v1/user/"+id,{auth:true})
        return response
    }catch(exception){
        throw exception
    }
}

getUserById= async(id)=>{
    try{
        console.log(id)
        let response = await this.getRequest("v1/user/"+id,
        {auth:true}
        )
        
        return response;

    }catch(exception){
        console.log(exception)
        throw exception
    }

}

updateUser=async(data,id)=>{

    try{console.log(data,id)
        let response = await this.putRequest("v1/user/"+id,
        data,
        {auth:true, file:true}
        )
        return response;
    }catch(exception){
        throw exception
    }
}

}
export default UserService