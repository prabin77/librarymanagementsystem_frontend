import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import authSvc from "./auth.service"
import { Container, Row,Col,Form ,Nav,Button} from "react-bootstrap"
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
const ActivateUser=()=>{
    const navigate =useNavigate()
    const [loading, setLoading]= useState()
    const[detail,setDetail]= useState()
    const params = useParams()

    const PasswordSchema = Yup.object({
        password:Yup.string().min(8).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"),null],"password and confirm password must match")
    })
    
    const {register,handleSubmit,formState:{errors}}= useForm({
        resolver: yupResolver(PasswordSchema)
    })
    
    const submitForm=async(data)=>{
       
        try{
            let response = await authSvc.setPassword(params.token,data)
            toast.success("Your password is successfully set")
            navigate("/login")
        }catch(exception){
            throw exception
        }

    }
    

    const verifyToken=async()=>{
        try{
            setLoading(true)
            // let token= params.token;
            let response = await authSvc.tokenVerify(params.token)
            setDetail(response.data)

        }catch(exception){
            console.log(exception)
            toast.error(exception.data?.msg)
            //navigate('/login')
        }
    }

    useEffect(()=>{
        verifyToken();
    },[])
    return(
        <>
         <Container className="mb-4">
        <Row  > 
          <Col sm='12' md='6' className="offset-md-3 ">
            <Container className="bg-light">
              <h1 className="text-center mb-3">Set Password</h1>
              <hr />
              <Form  onSubmit={handleSubmit(submitForm)}>
              <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Password</Form.Label>
                <Col>
                <Form.Control 
                size="sm"
                type="password"
                required
                placeholder="Enter your password" 
                {...register("password",{required:true})}
               />
                   <span className="text-danger">{errors?.password}</span>

</Col>
              </Form.Group>
              <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Confirm Password</Form.Label>
               <Col>
                <Form.Control
                size="sm"
                type="password"
                 required
               
                placeholder="Re-Enter your password" 
                {...register("confirmPassword",{required:true})}

                />
                   <span className="text-danger">{errors?.confirmPassword}</span>

                </Col>
              </Form.Group>
              
              <Nav className="offset-md-4">
                <Button className="btn btn-primary me-md-2" type="submit" varient="success">Login</Button>
                <Button className="btn btn-primary" type="reset" varient="danger">Cancel</Button>
              </Nav>
            
              
            
            </Form>

            </Container>

          </Col>
        </Row>

      </Container>

        </>
    )
}
export default ActivateUser;