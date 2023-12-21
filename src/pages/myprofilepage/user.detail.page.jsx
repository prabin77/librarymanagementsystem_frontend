import { Container, Row, Col, Carousel, Card } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { FaPen } from "react-icons/fa"
import { useEffect, useState } from "react"
import authSvc from "../auth/auth.service"

const MyProfilePage = () => {
    const [loading,setLoading]=useState(true)
    const[detail,setDetail]=useState()
console.log(detail)
 const getUser=async()=>{
    try{
        let response = await authSvc.getLoggedInUser()
        setDetail(response.data)

    }catch(exception){

    }finally{
        setLoading(false)
    }

 }

    useEffect(()=>{
        getUser()
    },[])
    return (
        <Container fluid>
            <Row>
                <Col   >
                {
                    loading? <p className="text-center text-danger">Loading...</p>: <>
                   { detail ? <>
                    <Container fluid className=" bg-light mb-3" >
                    <Row className="mx-3  mb-3">
                     <Col sm={9}className="my-3"><h4>My Profile</h4></Col>   
                       <Col sm={3}className="my-3"><NavLink to={'/user/'+detail.data._id} className="btn btn-primary float-end"><FaPen/> Edit</NavLink></Col> 
                    </Row>
                <hr />
                <Row>
                    <Col  sm='6' md='3' lg='3' className=" mx-3  mb-3">
                        <Card >
                            
                                <img src={import.meta.env.VITE_IMAGE_URL + "/uploads/user/"+detail.data.image}
                                    className=" m-2"  />
                                   
                        </Card>

                    </Col>
                    
                    <Col   className="my-3 ">
                    <Row>
                            <Col sm={4}>
                        <h4 className="mb-3">Name : </h4>
                            </Col>
                            <Col sm={8}>
                                <h5> {detail.data.name}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                        <h4 className="mb-3">Email : </h4>
                            </Col>
                            <Col sm={8}>
                                <h5> {detail.data.email}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                        <h4 className="mb-3">Role : </h4>
                            </Col>
                            <Col sm={8}>
                                <h5> {detail.data.role}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                        <h4 className="mb-3">Address : </h4>
                            </Col>
                            <Col sm={8}>
                                <h5> {detail.data.address}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                        <h4 className="mb-3">Phone Number : </h4>
                            </Col>
                            <Col sm={8}>
                                <h5> {detail.data.phone}</h5>
                            </Col>
                        </Row>
                        

                       

                    </Col>
                    
                   
                    
                    </Row>
                
               
            </Container>
                   
                   </>:<p className="text-center text-danger">No Details found</p>
                    
                    }
                    </>
                }
              
                </Col>

            </Row>

           
        </Container>
    )
}
export default MyProfilePage;



