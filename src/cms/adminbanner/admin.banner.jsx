import { Container,Row ,Col, Card,Button} from "react-bootstrap";
import { toast } from "react-toastify";
import {bannerSvc} from "."
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2'


const AdminBanner=()=>{
    const [bannerdata,setBannerData]= useState()
    const[loading,setLoading]= useState()

    const handleDelete=async(id)=>{
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
               try {let response = await bannerSvc.deleteById(id);
                if(response){
                      Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
           listBanner()
                }
            }catch(exception){
                toast.error("sorry! banner cannot be deleted at this moment")
            } finally{
                setLoading(false)
            }
            
            }
          })
    }

    const listBanner= async()=>{
        try{
            setLoading(true)
            let response = await bannerSvc.listBanner(10,1)
           if(response.data.data) {
            setBannerData(response?.data?.data)}

        }catch(exception){
            console.log(exception)
            toast.error("Error featching data")
        }finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        listBanner()
    },[])

    return(
        <>
         {   loading ?<>Loading...</>:<>
         
         <Card  className=" mx-3 my-3">
           <Card.Header>
           <Row  className="my-2 mx-2">
               <Col sm={9} > <h4 >Banner List</h4></Col>
            <Col>
            <NavLink sm={2} className="btn btn-fluid btn-primary float-end" to="/admin/banner/create"><FaPlus/> Add banner</NavLink>
        
            </Col>
                </Row>
           </Card.Header>
                
               <Card.Body>
                <Row>
                    <Col><Card.Title>Title</Card.Title></Col>
                    <Col><Card.Title>Image</Card.Title></Col>
                    <Col><Card.Title>Link</Card.Title></Col>
                    <Col><Card.Title>Status</Card.Title></Col>
                    <Col><Card.Title>Action</Card.Title></Col>

                </Row>
                <hr />
                    {bannerdata && bannerdata.map((data,index)=>(
                        <Row className="mb-3" key={index}>
                            <Col><Card.Title>{data.name}</Card.Title></Col>
                    <Col ><Card.Title>{data.image}</Card.Title></Col>
                    <Col sm={2}><Card.Title>{data.link}</Card.Title></Col>
                    <Col><Card.Title>{data.status}</Card.Title></Col>
                    <Col>
                    <NavLink to={"/admin/banner/"+data._id}>
                    <Button className="mx-2"variant="primary"><FaPen/> Edit</Button>
                    </NavLink>
                     
                      <NavLink onClick={(e)=>{
                        e.preventDefault();
                        handleDelete(data._id)
                      }} to={"/admin/banner/"+data._id}>
                      <Button variant="danger"><FaTrash/> Delete</Button>
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
export default AdminBanner;