import HttpService from "../../config/http.service";

class GenreService extends HttpService{
    createGenre= async(data)=>{
        try{
            console.log(data)
            
            let response = await this.postRequest("v1/genre",data, {auth:true, file:true})
            
            return response
        }catch(exception){
            throw exception
        }
    }
listGenre= async(perPage,page)=>{
   try{
     let response = await this.getRequest("v1/genre?perPage="+perPage+"&page="+page,
    {auth:true}
    )
    return response
}catch(exception){
    throw exception;
}
}   
deleteById= async(id)=>{
    try{
        let response = await this.deleteRequest("v1/genre/"+id,{auth:true})
        return response
    }catch(exception){
        throw exception
    }
}

getGenreById= async(id)=>{
    try{
        let response = await this.getRequest("v1/genre/"+id,
        {auth:true}
        )
        
        return response;

    }catch(exception){
        console.log(exception)
        throw exception
    }

}

updateGenre=async(data,id)=>{
    try{
        let response = await this.putRequest("v1/genre/"+id,
        data,
        {auth:true, file:true}
        )
        return response;
    }catch(exception){
        throw exception
    }
}
getGenreBySlug=  async(slug)=>{
    try{
        let response = await this.getRequest(
            "v1/genre/"+slug+"/slug"
        ) 
        

        return response.data.data;
    }catch(exception){
        console.log(exception)
        throw exception
    }

}

}
export default GenreService