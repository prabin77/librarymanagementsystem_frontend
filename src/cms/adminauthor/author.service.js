import HttpService from "../../config/http.service";

class AuthorService extends HttpService{
    createAuthor= async(data)=>{
        try{

            let response = await this.postRequest("v1/author",data, {auth:true})
            return response
        }catch(exception){
            throw exception
        }
    }
listAuthor= async(perPage,page)=>{
   try{
     let response = await this.getRequest("v1/author?perPage="+perPage+"&page="+page,
    {auth:true}
    )
    return response
}catch(exception){
    throw exception;
}
}   
deleteById= async(id)=>{
    try{
        let response = await this.deleteRequest("v1/author/"+id,{auth:true})
        return response
    }catch(exception){
        throw exception
    }
}

getAuthorById= async(id)=>{
    try{
        console.log(id)
        let response = await this.getRequest("v1/author/"+id,
        {auth:true}
        )
        
        return response;

    }catch(exception){
        console.log(exception)
        throw exception
    }

}

updateAuthor=async(data,id)=>{
 console.log(data)

    try{
        let response = await this.putRequest("v1/author/"+id,
        data,
        {auth:true}
        )
        return response;
    }catch(exception){
        throw exception
    }
}

}
export default AuthorService