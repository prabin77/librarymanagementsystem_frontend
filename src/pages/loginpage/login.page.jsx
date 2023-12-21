import React, { useState , useEffect} from "react";
import {Nav, Container, Row ,Col, Form,Button, } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate,NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import authSvc from "../auth/auth.service";
import { setLoggedInUser } from "../reducers/user.reducer";

const LoginPage = () => {
    const [credentials,setCredentials]= useState({
        email:null,
        password:null
    })

    const [errors,setErrors]= useState();
    const navigate= useNavigate();
    const dispatch = useDispatch();

    const handleChange= (e)=> {
        let {name,value}=e.target
        setCredentials({
            ...credentials,
            [name]:value,
            
            
        })
        let msg = handleValidation(value,name)
        setErrors({
          ...errors,
          [name]:msg,
    })
    }

    const handleValidation= (value,field)=>{
      let msg= null;
      switch(field){
        case "email":
          msg= (!value)? "Email is required": "";
          break;
          case "password":
          msg= (!value)? "password is required": "";
          break;
      }
      return msg;
    }

    const handleSubmit= async(e)=>{
      
      e.preventDefault();
      let errMsg={};
      Object.keys(credentials).map((field)=>{
        const msg = handleValidation(credentials[field],field)
        if(msg){
          
          errMsg[field]=msg;
        }
        

      })
      if(Object.keys(errMsg).length){
        setErrors(errMsg)
      }else{
        try{
          let response = await authSvc.loginSvc(credentials)
          
          localStorage.setItem('token' ,response.data.data.accessToken)
          localStorage.setItem('refreshtoken' ,response.data.data.refreshToken)
          localStorage.setItem('user' ,JSON.stringify(response.data.data.userDetail))
          dispatch(setLoggedInUser(response.data.data.userDetail));
          toast.success("You are successfully logged in")
          navigate("/admin")
        }catch(exception){
          
          console.log(exception.data.msg)
          toast(exception.data?.msg)
        }
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

    return(
        <> 
      <Container className="mb-4">
        <Row  > 
          <Col sm='12' md='6' className="offset-md-3 mb-3">
            <Container className="bg-light">
              <h1 className="text-center  mb-3">Login</h1>
              <hr />
              <Form  onSubmit={handleSubmit}>
              <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Email address</Form.Label>
                <Col>
                <Form.Control 
                size="sm"
                name="email"
                type="email"  
                required
                placeholder="Enter your email" 
                onChange={handleChange}/>
                   <span className="text-danger">{errors?.email}</span>

</Col>
              </Form.Group>
              <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Password</Form.Label>
               <Col>
                <Form.Control
                size="sm"
                name="password"
                 type="password" 
                 required
               
                placeholder="Enter your password" 
                onChange={handleChange}/>
                   <span className="text-danger">{errors?.password}</span>

                </Col>
              </Form.Group>
              
              <Nav className="offset-md-3 mb-4 ">
                <Button className="btn btn-primary me-md-2" type="submit" varient="success">Login</Button>
                <Button className="btn btn-primary" type="reset" varient="danger">Cancel</Button>
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

export default LoginPage;