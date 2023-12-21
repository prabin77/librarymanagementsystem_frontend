import { useState ,useEffect} from "react";
import { Card,Form,Row,Col,Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import *as Yup from "yup"
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { bookSvc } from ".";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AdminBookEdit= ()=>{
    const [loading,setLoading]=useState()
    const[listOfAuthors,setListOfAuthors]=useState()
    const[listOfGenres,setListOfGenres]=useState()
    const[detail,setDetail]=useState()
    const navigate= useNavigate()
    const params = useParams()

    const bookUpdateSchema= Yup.object({
        title: Yup.string().required(),
        quantity: Yup.string().nullable(),
        publishedDate: Yup.string().required(),
        publicationDetail: Yup.string().required(),
        author: Yup.string().nullable(),
        genre: Yup.array().required(),
    
        status: Yup.string().matches(/active|inactive/).default("active")
    
    })
    
    const { register, handleSubmit,getValues,formState: {errors}, setValue}= useForm({
        resolver:yupResolver(bookUpdateSchema)
    })
    
    const listAllAuthors = async () => {
        try {
            let response = await bookSvc.listAllAuthors()
            setListOfAuthors(response.data.data)
        } catch (exception) {
            throw exception
        }
    }
    const listAllGenres = async () => {
        try {
            let response = await bookSvc.listAllGenres()
            
            let formattedData = [];
            if (response.data.data) {
                formattedData = response.data.data.map((item) => {
                    return {
                        value: item._id,
                        label: item.name
                    }
                })
            }
            setListOfGenres(formattedData)
        } catch (exception) {
            throw exception
        }
    }

    const onSubmit = async (data) => {
        try {
            
            setLoading(true)
           let gen= (data.genre.map((item)=> item.value)).join(",")
            data.genres=gen

             let formData = new FormData()

             Object.keys(data).map((fieldName)=>{
                if(fieldName === "images"){
                    data.images.map((image)=>{
                        formData.append("images",image,image.name)

                    })
                }else{
                    formData.append(fieldName, data[fieldName])
                }
             })

                let response = await bookSvc.updatBook(formData,params.id)
                toast.success(response.data?.msg)
                navigate("/admin/book")
          
        } catch (exception) {
            console.log(exception)
            toast.error(exception)
        } finally {
            setLoading(false);
        }

    }
    const handleImage = (e) => {
        let images = Object.values(e.target.files);

        let allow = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp', 'webp']
        let validImage=[];
        images.map((image)=>{
            let ext = (image.name.split(".")).pop();
            let size = image.size;

            if (allow.includes(ext.toLowerCase())) {
                if (size <= 3000000) {
                   validImage.push(image)
                } else {
                    setError('images', "File size should be less than 3mb")
                }
            } else {
                setError("images", "Images format not supported")
            }
        })
        setValue("images",validImage)
        

       
    }

    

    const getDetail=async ()=>{
        try{

            let response = await bookSvc.getBookById(params.id)
            let book=response.data.data
            console .log(book)
            setValue("title",book.title)
            setValue("status",book.status)
            setValue("author",book.author)
            setValue("quantity",book.quantity)
            setValue("publicationDetail",book.publicationDetail)
            setValue("publishedDate",book.publishedDate)
            // let selGen= book.genre.map((gen)=>{
            //     return{
            //         label:gen.title,
            //         value:gen._id
            //     }
            // })
            setValue("genres",book.genres)

            setDetail({
                ...book,
                genre
            })
        }catch(exception){
            console.log(exception)
            toast.error("Book does not exist")
            //navigate("/admin/book")
        }

    }

    useEffect(() => {
        getDetail()
        listAllAuthors()
        listAllGenres()

    }, [params.id])

    return (
        <>
        <Card className=" mx-3 my-3">
                <Card.Header>
                    <Row className="my-2 mx-2">
                        <Col sm={9} > <h4 >Book Update</h4></Col>

                    </Row>
                </Card.Header>

                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="Title"
                                    placeholder="Title"
                                    {...register("title", { required: true })} />
                                <span className="text-danger">
                                    {
                                        (errors && errors.title?.message) ? errors.title.message : ""
                                    }
                                </span>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Quantity
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                type="Number"
                                    {...register("quantity")}
                                    placeholder="Quantity" />
                                <span className="text-danger">
                                    {
                                        (errors && errors.quantity?.message) ? errors.quantity.message : ""
                                    }
                                </span>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Author
                            </Form.Label>
                            <Col sm={8}>
                               

                                <Form.Select  size="sm"{...register("author",{required:false})}>
                        <option value="">--select one--</option>
                        {
                            listOfAuthors && listOfAuthors.map((aut,i)=>(
                                <option key={i} value={aut._id}>{aut.name}</option>
                            ))
                        }
                        </Form.Select>
                                <span className="text-danger">
                                    {
                                        (errors && errors.author?.message) ? errors.author.message : ""
                                    }
                                </span>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Genre
                            </Form.Label>
                            <Col sm={8}>
                                <Select

                                    isMulti
                                    name="genres"
                                   options={listOfGenres}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    defaultValue={getValues('genres')}
                                    onChange={(setOpts)=>{
                                        setValue("genres",setOpts)
                                    }}

                                />

                                <span className="text-danger">
                                    {
                                        (errors && errors.genre?.message) ? errors.genre.message : ""
                                    }
                                </span>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Published Date
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="string"
                                    {...register("publishedDate")}
                                    placeholder="Published date" />
                                <span className="text-danger">
                                    {
                                        (errors && errors.publishedDate?.message) ? errors.publishedDate.message : ""
                                    }
                                </span>

                            </Col>
                        </Form.Group>
                      
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Publication Detail
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    style={{ resize: "none" }}
                                    type="string"
                                    {...register("publicationDetail")}
                                    placeholder="Publication Detail" />
                                <span className="text-danger">
                                    {
                                        (errors && errors.publicationDetail?.message) ? errors.publicationDetail.message : ""
                                    }
                                </span>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Status
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Select size="sm" {...register("status", { required: true })} >
                                    <option value="active">Publish</option>
                                    <option value="inactive">Un-Publish</option>

                                </Form.Select>
                                <span className="text-danger">
                                    {
                                        (errors && errors.status?.message) ? errors.status.message : ""
                                    }
                                </span>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3"controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Images
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control type="file" multiple onChange={handleImage} />
                                <span className="text-danger">
                                    {
                                        (errors && errors.images?.message) ? errors.images.message : ""
                                    }
                                </span>
                            </Col>
                            <Col sm={3}>
                            {
                                detail && detail.images?
                                <img src={import.meta.env.VITE_IMAGE_URL+"/uploads/books/"+detail.images}
                                className="img img-fluid"/>
                                :<></>
                            }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">

                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit" disabled={loading}>Update</Button>
                                <Button className="mx-3" variant="danger" type="reset">Cancle</Button>


                            </Col>
                        </Form.Group>
                    </Form>




                </Card.Body>



            </Card>
        </>
    )
}
export default AdminBookEdit;