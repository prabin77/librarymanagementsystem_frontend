import { useEffect, useState } from "react";
import { Card,Row,Col,Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaPlus,FaPen,FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { bookSvc } from ".";
import Swal from "sweetalert2";


const AdminBookList=()=>{
    const[loading, setLoading]= useState()
    const[bookdata,setBookData]= useState()

    const listBook =async ()=>{
        try{
            
            let response= await bookSvc.BookList(10,1)
            
           if(response.data.data){
            setBookData(response?.data?.data)
           }
        }catch(exception){
            toast.error("Error fetching book data")
        }finally{setLoading(false)}
    }

    const handleDelete =async (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
              setLoading(true);
               try {let response = await bookSvc.deleteById(id);
                if(response){
                      Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
           listBook()
                }
            }catch(exception){
                toast.error("sorry! banner cannot be deleted at this moment")
            } finally{
                setLoading(false)
            }
            
            }
          })

    }

    useEffect(()=>{
        listBook()
    },[])

return(
    <>
     {   loading ?<>Loading...</>:<>
         
         <Card  className=" mx-3 my-3">
           <Card.Header>
           <Row  className="my-2 mx-2">
               <Col sm={9} > <h4 >Book List</h4></Col>
            <Col>
            <NavLink sm={2} className="btn btn-fluid btn-primary float-end" to="/admin/book/create"><FaPlus/> Add book</NavLink>
        
            </Col>
                </Row>
           </Card.Header>
                
               <Card.Body>
                <Row>
                    <Col><Card.Title>Title</Card.Title></Col>
                    <Col><Card.Title>Quantity</Card.Title></Col>
                    <Col><Card.Title>Published date</Card.Title></Col>
                    <Col><Card.Title>Detail</Card.Title></Col>
                    <Col><Card.Title>Status</Card.Title></Col>
                    <Col><Card.Title>Action</Card.Title></Col>

                </Row>
                <hr />
                    {bookdata && bookdata.map((data,index)=>(
                        <Row className="mb-3" key={index}>
                            <Col  sm={2}><Card.Title>{data.title}</Card.Title></Col>
                            <Col sm={2}><Card.Title>{data.quantity}</Card.Title></Col>
                    <Col sm={2}><Card.Title>{data.publishedDate}</Card.Title></Col>
                    <Col sm={2}><Card.Title>{data.publicationDetail}</Card.Title></Col>
                    <Col sm={2}><Card.Title>{data.status}</Card.Title></Col>
                    <Col >
                    
                   <NavLink to={"/admin/book/"+data._id}>
                   <Button   md={3} className="mx-2"variant="primary"><FaPen/> </Button>
                    </NavLink> 
                      <NavLink onClick={(e)=>{
                        e.preventDefault();
                        handleDelete(data._id)
                      }} to={"/admin/book/"+data._id}>
                      <Button sm={3} variant="danger"><FaTrash/> </Button>
                        </NavLink> 
                    
                    </Col>
                        </Row>
                    ))}
                </Card.Body>
            


        </Card>
         </>
}
    </>
)
}
export default AdminBookList;