
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { FaPaperPlane, FaPlus, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookSvc } from ".";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Select from "react-select";






const AdminBookCreate = () => {
    const [loading, setLoading] = useState(false)
        const [listOfAuthors, setListOfAuthors] = useState()
        const [listOfGenres, setListOfGenres] = useState()
        const navigate = useNavigate()
  

  const bookSchema = Yup.object({
    title: Yup.string().required(),
    genres: Yup.array().required(),
    publicationDetail: Yup.string().nullable(),
    publishedDate: Yup.string().nullable(),
    quantity: Yup.number().required(),
    author: Yup.string().nullable(),
    status: Yup.string()
      .matches(/active|inactive/)
      .default("active"),
   
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(bookSchema),
  });


    const submitEvent = async (data) => {
        console.log(data.genres)
        try {
            let gen = (data.genres.map((item) => item.value)).join(',')
            data.genres = gen
            console.log(data.genres)
            
            let formData = new FormData()
            Object.keys(data).map((fieldName) => {
                //     console.log(fieldName)
                if(fieldName === 'images'){
                    data.images.map((image) => {
                        formData.append("images", image, image.name)
                    })
                } else {
                    formData.append(fieldName, data[fieldName])
                }
            })
            let response = await bookSvc.createBook(formData);
            if(response) {
                toast.success(response.data.msg);
                navigate('/admin/book')
            } else {
                
            }

        } catch (exception) {
            console.error(exception);
            toast.error(exception.data?.msg);
        } finally {
            setLoading(false);
        }
    };

  const handleImage = (e) => {
    // console.log(e.target.files);
    let images = Object.values(e.target.files);
    // validate
    let allow = ["jpg", "jpeg", "png", "gif", "svg", "bmp", "webp"];
    let validImage = [];
    images.map((image) => {
        let ext = image.name.split(".").pop();
        let size = image.size;
        if (allow.includes(ext.toLowerCase())) {
            if (size <= 3000000) {
                validImage.push(image)
            } else {
                setError("image", "File size should be less than 3mb");
            }
        } else {
            setError("image", "Image format not supported.");
        }
      
    })

    setValue('images', validImage)

    

  };

  const listAllGenres = async () => {
    try {
      const list = await bookSvc.listAllGenres();
      let formattedData = [];
      if (list.data.data) {
        formattedData = list.data.data.map((item) => {
          return {
            value: item._id,
            label: item.name,
          };
        });
      }
      setListOfGenres(formattedData);
    } catch (exception) {}
  };

  const listAllAuthors = async () => {
    try {
      let response = await bookSvc.listAllAuthors();
      setListOfAuthors(response.data.data);
    } catch (err) {}
  };

  

  useEffect(() => {
    listAllGenres();
    listAllAuthors();
   
  }, []);
    return (
            <>
                <Card className=" mx-3 my-3">
                    <Card.Header>
                        <Row className="my-2 mx-2">
                            <Col sm={9} > <h4 >Book Create</h4></Col>
    
                        </Row>
                    </Card.Header>
    
                    <Card.Body>
                        <Form onSubmit={handleSubmit(submitEvent)}>
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
                                        type="number"
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
                                    {/* <Select
    
    
                                        name="authors"
                                        options={listOfAuthors}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        required
                                        onChange={(setOpts)=>{
                                            setValue("authors",setOpts)
                                        }}
                                    /> */}
    
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
                                    Genres
                                </Form.Label>
                                <Col sm={8}>
                                    <Select
    
                                        isMulti
                                       
                                        options={listOfGenres}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        required
                                        onChange={(setOpts)=>{
                                            setValue("genres",setOpts)
                                           
                                        }}
    
                                    />
    
                                    <span className="text-danger">
                                        {
                                            (errors && errors.genres?.message) ? errors.genres.message : ""
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
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                    Images
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="file" multiple onChange={handleImage} />
                                    <span className="text-danger">
                                        {
                                            (errors && errors.images?.message) ? errors.images.message : ""
                                        }
                                    </span>
                                </Col>
                            </Form.Group>
    
                            <Form.Group as={Row} className="mb-3">
    
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit">Create</Button>
                                    <Button className="mx-3" variant="danger" type="reset">Cancle</Button>
    
    
                                </Col>
                            </Form.Group>
                        </Form>
    
    
    
    
                    </Card.Body>
    
    
    
                </Card>
            </>
        )
};

export default AdminBookCreate;