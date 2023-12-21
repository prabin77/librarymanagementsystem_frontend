// import { Row,Col,Card,Button, Form } from "react-bootstrap";
// import * as Yup from "yup"
// import {useForm} from "react-hook-form"
// import {yupResolver} from "@hookform/resolvers/yup"
// import { toast } from "react-toastify";
// import {bannerSvc} from "."
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const BannerCreate= ()=>{
//     const[loading,setLoading]= useState()
//     const navigate = useNavigate()

//     const bannerSchema= Yup.object({
//         name: Yup.string().required(),
//         link:Yup.string().url().nullable(),
//         status: Yup.string().matches(/active|inactive/).default("active")
//     })


// const {register,handleSubmit,formState:{errors},setValue}= useForm({
//     resolver:yupResolver(bannerSchema)
// })

// const onSubmit = async(data)=>{
//     try{
//         setLoading(true)
//         if (!data.image){
//             setError('image',{message:"Image is required"})
//         }else{
//             let response = await bannerSvc.createBanner(data)
//             toast.success(response.data?.msg)
//             // navigate("/admin/banner")
//         }
//     }catch(exception){
//         console.log(exception)
//         toast.error(exception)
//     }finally{
//         setLoading(false);
//     }

// }
// const handleImage=(e)=>{
//     let image= e.target.files[0];

//     let ext = (image.name.split(".")).pop();
//     let size = image.size;
//     let allow = ['jpg','jpeg','png','gif','svg','bmp','webp']

//     if(allow.includes(ext.toLowerCase())){
//         if(size<=3000000){
//             setValue('image',image)
//         }else{
//             setError('image',"File size should be less than 3mb")
//         }
//     }else{
//         setError("image","Image format not supported")
//     }
// }


//     return(
//         <>
//         <Card  className=" mx-3 my-3">
//            <Card.Header>
//            <Row  className="my-2 mx-2">
//                <Col sm={9} > <h4 >Banner Create</h4></Col>
            
//                 </Row>
//            </Card.Header>
                
//                <Card.Body>
//                 <Form onSubmit={handleSubmit(onSubmit)}>
//                     <Form.Group as={Row} className="mb-3">
//                         <Form.Label column sm={2}>
//                             Name
//                         </Form.Label>
//                         <Col sm={8}>
//                         <Form.Control
//                          type="Name"
//                          placeholder="Name"
//                          {...register("name",{required:true})}/>
//                          <span className="text-danger">
//                             {
//                                 (errors && errors.name?.message)? errors.name.message:""
//                             }
//                          </span>
                            
//                             </Col>
//                     </Form.Group>
//                     <Form.Group as={Row} className="mb-3">
//                         <Form.Label column sm={2}>
//                             Link
//                         </Form.Label>
//                         <Col sm={8}>
//                         <Form.Control
//                          type="url"
//                          {...register("link")}
//                          placeholder="Link"/>
//                          <span className="text-danger">
//                             {
//                                 (errors && errors.link?.message)? errors.link.message:""
//                             }
//                          </span>
                            
//                             </Col>
//                     </Form.Group>
//                     <Form.Group as={Row} className="mb-3">
//                         <Form.Label column sm={2}>
//                             Status
//                         </Form.Label>
//                         <Col sm={8}>
//                         <Form.Select size="sm" {...register("status",{required:true})} >
//                             <option value="active">Publish</option>
//                             <option value="inactive">Un-Publish</option>

//                             </Form.Select>
//                             <span className="text-danger">
//                             {
//                                 (errors && errors.status?.message)? errors.status.message:""
//                             }
//                          </span>
                            
//                             </Col>
//                     </Form.Group>
//                     <Form.Group as={Row} className="mb-3">
//                         <Form.Label column sm={2}>
//                             Image
//                         </Form.Label>
//                         <Col sm={8}>
//                         <Form.Control type="file" onChange={handleImage} />
//                         <span className="text-danger">
//                             {
//                                 (errors && errors.image?.message)? errors.image.message:""
//                             }
//                          </span>
//                             </Col>
//                     </Form.Group>

//                     <Form.Group as={Row} className="mb-3">
                       
//                         <Col sm={{span:10 ,offset:2}}>
//                        <Button type="submit">Create</Button>
//                        <Button className="mx-3" variant="danger" type="reset">Cancle</Button>

                            
//                             </Col>
//                     </Form.Group>
//                 </Form>
                
                    
                    
                    
//                 </Card.Body>
            


//         </Card>
//         </>
//     )
// }

// export default BannerCreate