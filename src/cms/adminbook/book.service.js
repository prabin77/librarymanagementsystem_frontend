import HttpService from "../../config/http.service";

class BookService extends HttpService{
    BookList=async(perPage,page)=>{
        try{
            let response = await this.getRequest("v1/book?perPage="+perPage+"&page="+page,{auth:true})
            return response;
        }catch(exception){
throw exception
        }
    }

    createBook= async (data)=>{
        
        try{
            let response = await this.postRequest(
                "v1/book",
                data,
                {auth:true,file:true}
            )
            return response
        }catch(exception){
            throw exception
        }
    }

    listAllAuthors= async()=>{
        try{
            let response = await this.getRequest(
                "v1/author",
                {auth:true}
            )
                return response
        }catch(exception){
            throw exception
        }
    }

    listAllGenres= async()=>{
        try{
            let response = await this.getRequest(
                "v1/genre",
                {auth:true}
            )
                return response
        }catch(exception){
            throw exception
        }
    }

    deleteById = async(id)=>{
        try{
            let response = await this.deleteRequest(
                "v1/book/"+id,
                {auth:true}

            )
            return response
        }catch(exception){
            throw(exception)
        }
    }

    getBookById= async(id)=>{
        try{
            let response = await this.getRequest(
                "v1/book/"+id,
                {auth:true}
            )
            

            return response;
        }catch(exception){
            console.log(exception)
            throw exception
        }
    }

    getBookBySlug=  async(slug)=>{
        try{
            let response = await this.getRequest(
                "v1/book/"+slug+"/slug"
            ) 
            

            return response.data;
        }catch(exception){
            console.log(exception)
            throw exception
        }

    }
    getBookByGenre=  async(genre)=>{
        try{
            let response = await this.getRequest(
                "v1/book/"+genre+"/genre"
            ) 
            

            return response.data;
        }catch(exception){
            console.log(exception)
            throw exception
        }

    }

    getBooksByKeyword = async(keyword)=>{
        try{
            let response = await this.getRequest('/v1/book/search?keyword='+keyword);
            return response.data;

        }catch(exception){
            throw(exception)
        }
    }
}
export default BookService;