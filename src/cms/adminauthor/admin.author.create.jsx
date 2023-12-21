import { Row,Col,Card,Button, Form } from "react-bootstrap";
import * as Yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { toast, } from "react-toastify";
import {authorSvc} from "."
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthorCreate= ()=>{
    const[loading,setLoading]= useState()
    const navigate = useNavigate()

    const authorSchema= Yup.object({
        name: Yup.string().required(),
        link:Yup.string().url().nullable(),
        status: Yup.string().matches(/active|inactive/).default("active")
    })


const {register,handleSubmit,formState:{errors},setValue}= useForm({
    resolver:yupResolver(authorSchema)
})

const onSubmit = async(data)=>{
    try{
        setLoading(true)
        if (!data){
            setError({message:"data is required"})
        }else{
            let response = await authorSvc.createAuthor(data)
            toast.success(response.data?.msg)
             navigate("/admin/author")
        }
    }catch(exception){
        console.log(exception)
        toast.error(exception)
    }finally{
        setLoading(false);
    }

}



    return(
        <>
        <Card  className=" mx-3 my-3">
           <Card.Header>
           <Row  className="my-2 mx-2">
               <Col sm={9} > <h4 >Author Create</h4></Col>
            
                </Row>
           </Card.Header>
                
               <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Name
                        </Form.Label>
                        <Col sm={8}>
                        <Form.Control
                         type="Name"
                         placeholder="Name"
                         {...register("name",{required:true})}/>
                         <span className="text-danger">
                            {
                                (errors && errors.name?.message)? errors.name.message:""
                            }
                         </span>
                            
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Description
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    style={{ resize: "none" }}
                                    type="string"
                                    {...register("description")}
                                    placeholder="Description" />
                                <span className="text-danger">
                                    {
                                        (errors && errors.description?.message) ? errors.description.message : ""
                                    }
                                </span>

                            </Col>
                        </Form.Group>                                                                  
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Status
                        </Form.Label>
                        <Col sm={8}>
                        <Form.Select size="sm" {...register("status",{required:true})} >
                            <option value="active">Publish</option>
                            <option value="inactive">Un-Publish</option>

                            </Form.Select>
                            <span className="text-danger">
                            {
                                (errors && errors.status?.message)? errors.status.message:""
                            }
                         </span>
                            
                            </Col>
                    </Form.Group>
                   

                    <Form.Group as={Row} className="mb-3">
                       
                        <Col sm={{span:10 ,offset:2}}>
                       <Button type="submit">Create</Button>
                       <Button className="mx-3" variant="danger" type="reset">Cancle</Button>

                            
                            </Col>
                    </Form.Group>
                </Form>
                
                    
                    
                    
                </Card.Body>
            


        </Card>
        </>
    )
}

export default AuthorCreate