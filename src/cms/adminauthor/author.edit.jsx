import {Card,Container, Form,Row,Col,Button } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash,FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { authorSvc } from ".";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AdminAuthorEdit=( )=>{
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
const[detail,setDetail]= useState();
const params= useParams()


const authorSchema= Yup.object({
  title: Yup.string().required(),
  description:Yup.string().nullable(),
  status:Yup.string().matches(/active|inactive/).default('active'),
})

const {register,handleSubmit,formState:{errors},setValue} = useForm({
resolver:yupResolver(authorSchema)

})
const submitEvent=async(data)=>{

try{
    let response = await authorSvc.updateAuthor(data,params.id)
    toast.success(response.data?.msg)
    navigate("/admin/author")
  
}catch(exception){
  console.log(exception)
  toast.error(exception.data?.msg)
}finally{
  setLoading(false);
}

}


const getDetail=async()=>{
  try{

    let response=await authorSvc.getAuthorById(params.id)
    console.log(response)
    setValue("name",response.data.data.name)
    setValue("description",response.data.data.description)
    setValue("status",response.data.data.status)
    setDetail(response.data.data)
  }
  catch(exception){
    toast.error("Author does not exist")
   navigate("/admin/author")

  }
}
useEffect(()=>{
  getDetail()
},[])
 return(<>
<Card className="mx-3 my-3">
<Card.Header>
 <Container  >
    
         <Row >
            <Col sm={12} md={6} ><h4> edit Author </h4></Col>
      <Col sm={12} md={6} >
        <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/author/edit">
        <FaPlus/>Add Author
        </NavLink>
        </Col> 
       </Row>
</Container>
       </Card.Header>
       <Card.Body>
       <Form onSubmit={handleSubmit(submitEvent)}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Title
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="Name" placeholder="Name" {...register("name",{required:true})}/>
      <span className="text-danger">
        {
          (errors && errors.title?.message)? errors.title.message:""
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
          <Form.Label  column sm={2}>
            Status
          </Form.Label>
          <Col sm={10}>
            <Form.Select size="sm"  {...register("status",{required:true,value:"active"})}>
              <option value={"active"}>Publish</option>
              <option value={"inactive"}>Un-Publish</option>
            </Form.Select>
            <span className="text-danger">
        {
          (errors && errors.status?.message)? errors.status.message:""
        }
      </span>
          </Col>
        </Form.Group>

     
      
       
      
      

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button  variant="primary" type="submit" disabled={loading} size="sm"> <FaPaperPlane/> Update</Button>
          <NavLink to={"/admin/author"}>
          <Button className="mx-3" variant="danger" type="reset" size="sm"><FaTrash/> Cancel</Button>
          </NavLink>
        </Col>
      </Form.Group>
    </Form>
       </Card.Body>
       </Card>

 
 
 </>)
}

export default AdminAuthorEdit;