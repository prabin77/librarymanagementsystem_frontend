import {Card,Container, Form,Row,Col,Button } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash,FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { genreSvc } from ".";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AdminGenreEdit=( )=>{
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
const[detail,setDetail]= useState();
const params= useParams()


const genreSchema= Yup.object({
  name: Yup.string().required(),
  description:Yup.string().nullable(),
  status:Yup.string().matches(/active|inactive/).default('active'),
})

const {register,handleSubmit,formState:{errors},setValue} = useForm({
resolver:yupResolver(genreSchema)

})
const submitEvent=async(data)=>{
try{
    let response = await genreSvc.updateGenre(data,params.id)
    toast.success(response.data?.msg)
    navigate("/admin/genre")
  
}catch(exception){
  console.log(exception)
  toast.error(exception.data?.msg)
}finally{
  setLoading(false);
}

}

const handleImage=(e)=>{
  let image = e.target.files[0];
 

  let ext = (image.name.split('.')).pop();
  let size = image.size;
  let allow= ['jpg','jpeg','png','gif','svg','bmp','webp']

  if(allow.includes(ext.toLowerCase())){
    if(size <= 3000000){
      setValue('image',image)
    }else{
      setError("image","File size should be less than 3mb")
    }
  }else{
    setError("image","Image format not supported")
  }
}
// console.log(detail)
const getDetail=async()=>{
  try{

    let response=await genreSvc.getGenreById(params.id)
    console.log(response)
    setValue("name",response.data.data.name)
    setValue("description",response.data.data.description)
    setValue("status",response.data.data.status)
    setDetail(response.data.data)
  }
  catch(exception){
    console.log(exception)
    toast.error("Genre does not exist")
  // navigate("/admin/genre")

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
            <Col sm={12} md={6} ><h4> edit Genre </h4></Col>
      <Col sm={12} md={6} >
        <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/genre/edit">
        <FaPlus/>Add Genre
        </NavLink>
        </Col> 
       </Row>
</Container>
       </Card.Header>
       <Card.Body>
       <Form onSubmit={handleSubmit(submitEvent)}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="Name" placeholder="Name" {...register("name",{required:true})}/>
      <span className="text-danger">
        {
          (errors && errors.name?.message)? errors.name.message:""
        }
      </span>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
        Description  
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="description" {...register("description",{required:false})} />
          <span className="text-danger">
        {
          (errors && errors.description?.message)? errors.description.message:""
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

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Image
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="file" 
           onChange={handleImage}/>
          <span className="text-danger">
        {
          (errors && errors.image?.message)? errors.image.message:""
        }
      </span>
        </Col>
        <Col sm={3}>
          {
          
            detail && detail.image ? 
            <img src={import.meta.env.VITE_IMAGE_URL+"/uploads/genre/"+detail.image} 
            className="img img-fluid"/>
            :<></>
          }
        </Col>
      </Form.Group>
      
       
      
      

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button  variant="primary" type="submit" disabled={loading} size="sm"> <FaPaperPlane/> Update</Button>
          <NavLink to={"/admin/genre"}>
          <Button className="mx-3" variant="danger" type="reset" size="sm"><FaTrash/> Cancel</Button>
          </NavLink>
        </Col>
      </Form.Group>
    </Form>
       </Card.Body>
       </Card>

 
 
 </>)
}

export default AdminGenreEdit;