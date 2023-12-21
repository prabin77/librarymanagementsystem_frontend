import { Container,Row ,Col, Card,Button} from "react-bootstrap";
import { toast } from "react-toastify";
import {userSvc} from "."
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2'


const AdminUser=()=>{
    const [userdata,setUserData]= useState()
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
               try {let response = await userSvc.deleteById(id);
                if(response){
                      Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
           listUser()
                }
            }catch(exception){
                toast.error("sorry! user cannot be deleted at this moment")
            } finally{
                setLoading(false)
            }
            
            }
          })
    }

    const listUser= async()=>{
        try{
            setLoading(true)
            let response = await userSvc.listUser(10,1)
           if(response.data.data) {
            setUserData(response?.data?.data)}

        }catch(exception){
            console.log(exception)
            toast.error("Error featching data")
        }finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        listUser()
    },[])

    return(
        <>
         {   loading ?<>Loading...</>:<>
         
         <Card  className=" mx-3 my-3">
           <Card.Header>
           <Row  className="my-2 mx-2">
               <Col sm={9} > <h4 >User List</h4></Col>
            <Col>
            <NavLink sm={2} className="btn btn-fluid btn-primary float-end" to="/admin/user/create"><FaPlus/> Add user</NavLink>
        
            </Col>
                </Row>
           </Card.Header>
                
               <Card.Body>
                <Row>
                    <Col><Card.Title>Title</Card.Title></Col>
                    <Col><Card.Title>Image</Card.Title></Col>
                    <Col><Card.Title>Role</Card.Title></Col>
                    <Col><Card.Title>Status</Card.Title></Col>
                    <Col><Card.Title>Phone</Card.Title></Col>
                    <Col><Card.Title>Action</Card.Title></Col>

                </Row>
                <hr />
                    {userdata && userdata.map((data,index)=>(
                        <Row className="mb-3" key={index}>
                            <Col><Card.Title>{data.name}</Card.Title></Col>
                    <Col><Card.Title>{data.image}</Card.Title></Col>
                    <Col><Card.Title>{data.role}</Card.Title></Col>
                    <Col><Card.Title>{data.phone}</Card.Title></Col>
                    <Col><Card.Title>{data.status}</Card.Title></Col>
                    <Col>
                    <NavLink to={"/admin/user/"+data._id}>
                    <Button className="mx-2"variant="primary"><FaPen/> Edit</Button>
                    </NavLink>
                     
                      <NavLink onClick={(e)=>{
                        e.preventDefault();
                        handleDelete(data._id)
                      }} to={"/admin/user/"+data._id}>
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
export default AdminUser;