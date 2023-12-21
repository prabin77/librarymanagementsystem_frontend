import  { useState, useEffect } from "react";
import { Nav, Container, Row, Col, Form, Button ,NavDropdown,Dropdown,ButtonGroup} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authSvc from "../auth/auth.service";
import { dropdownWrap } from "./register";
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";

const RegisterPage = () => {
 const navigate = useNavigate()
 const [loading, setLoading]= useState()

    const registerSchema=Yup.object({
        name: Yup.string().required(),
        email:Yup.string().email().required(),
        address: Yup.string().required(),
        phone:Yup.string().required(),
        role:Yup.string().matches(/student|teacher/)
    })

    const { register,handleSubmit,formState:{errors},setValue}= useForm({
        resolver: yupResolver(registerSchema)
    })

    const onSubmit = async(data)=>{
        try{
            setLoading(true)
            data.image=data.image[0]
            console.log(data)
            let response = await authSvc.registerSvc(data)
            toast.success("Your account has been successfully registered")
            navigate('/login')

        }catch(exception){
            console.log(exception)
            throw exception
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        let token= localStorage.getItem('token');
  
        let user = JSON.parse(localStorage.getItem('user'))
        
        if(token&& user){
         toast.info("You are already logged in")
         navigate('/'+user.role)
        }
  
     },[])
    return (
        <>
            <Container className="mb-4">
                <Row  >
                    <Col sm='12' md='6' className="offset-md-3 ">
                        <Container className="bg-light ">
                            <h1 className="text-center mb-4">Register User</h1>
                            <hr />
                            <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Name</Form.Label>
                <Col>
                <Form.Control 
                size="sm"
                type="text"  
                required
                placeholder="Enter your name" 
                {...register('name', {required:true})}
                />
                   <span className="text-danger">{errors?.name}</span>

</Col>
              </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3">Email </Form.Label>
                                    <Col>
                                        <Form.Control
                                            size="sm"
                                        
                                            type="email"
                                            required
                                            placeholder="Enter your email"
                {...register('email', {required:true})}
                                        
                                        />
                                        <span className="text-danger">{errors?.email}</span> 

                                    </Col>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3">Address</Form.Label>
                                    <Col>
                                        <Form.Control
                                            size="sm"
                                            name="address"
                                            type="text"
                                            required

                                            placeholder="Enter your address"
                {...register('address', {required:true})}
                                        
                                        />
                                         <span className="text-danger">{errors?.address}</span>

                                    </Col>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3">Phone</Form.Label>
                                    <Col>
                                        <Form.Control
                                            size="sm"
                                            name="phone"
                                            type="tel"
                                            required

                                            placeholder="Enter your address"
                {...register('phone', {required:true})}
                                        
                                        />
                                        <span className="text-danger">{errors?.phone}</span>

                                    </Col>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3">Role</Form.Label>
                                    <Col>
                
                                    <select

                    className="form-control form control-sm"
                    {...register('role', { required: true })}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                   
                  </select>
                                    {/* <NavDropdown sm={12}
                                     className="form-control form control-sm"
                                    title={"---Select One---"}
                                     {...register('role', {required:true})} >
                                        <NavDropdown.Item className="col-lg-12" value={"student"}>Student</NavDropdown.Item>
                                        <NavDropdown.Item value={"teacher"}>Teacher</NavDropdown.Item>

                                    </NavDropdown> */}
                                      
                                        <span className="text-danger">{errors?.role}</span>

                                    </Col>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3">Image</Form.Label>
                                    <Col>
                                        <Form.Control
                                            size="sm"
                                            
                                            type="file"
                                            required
                                            {...register('image')}
                                            accept="image/*"
                                        
                                        />
                                        <span className="text-danger">{errors.image && errors.image?.message}</span>

                                    </Col>
                                </Form.Group>

                                <Nav className="offset-md-3 mb-4">
                                    <Button className=" me-md-2" type="submit" variant="success">Register</Button>
                                    <Button  type="reset" variant="danger">Cancel</Button>
                                </Nav>


                               <NavLink to="/forgot-password"> Forgot password?</NavLink>
                                    <span> Or </span>
                                    <NavLink to="/register-user">Register your account</NavLink>
                                
                            </Form>

                        </Container>

                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default RegisterPage;