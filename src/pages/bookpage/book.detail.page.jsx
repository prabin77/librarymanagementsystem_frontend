import { Container, Row, Col, Carousel, Card } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom"
import {cardTitle} from "./bookpage"
import  Pagination from "react-bootstrap/Pagination"
import { useCallback, useEffect, useState } from "react"
import { bookSvc } from "../../cms/adminbook"
import GenreBookPage from "../genrepage/genrebook.page"
import BookCardComponent from "./book-card.component"


const BookDetailPage = () => {
    let [loading, setLoading]=useState(true)
    const params= useParams()
    let [detail, setDetail]=useState()

   const getBookDetail=useCallback(async()=>{
    try{
        
        let response = await bookSvc.getBookBySlug(params.slug)
        if(response.data){
            setDetail(response.data)
        }else{
            setDetail(null)
        }

    }catch (exception){
        throw exception
    }finally{
        setLoading(false)
    }
   },[params])


    useEffect(()=>{
        getBookDetail()
    },[])


    return (
        <Container fluid>
            <Row>
                <Col sm={12}  >
                    {
                        loading? <p className="text-center text-danger">Loading...</p>:<>
                     {
                        detail? <>
                            <Container fluid className=" bg-light  mb-3">
                
                <Row >
                    <Col  sm='6' md='3' lg='3' className=" mb-3">
                        <Card >
                             <Carousel>
                           { 
                           detail.images && detail.images.map((img,index)=>(

                            <Carousel.Item key={index}>
                                <img src={import.meta.env.VITE_IMAGE_URL+'uploads/books/'+img}
                                    className="card-img-top img img-fluid"  />
                            </Carousel.Item>
                           ))
                          
}
                            </Carousel>

                        



                        </Card>

                    </Col>
                    <Col  sm='6' md='3' lg='6' className="mx-4 my-3 mb-3">
                       <h1 className="text-center">{detail.title}</h1>
                       <hr />
                        
                        <Row>
                            <Col sm={4}>
                        <h4 className="mb-3">Quantity : </h4>
                            </Col>
                            <Col sm={8}>
                                <h5> {detail.quantity}</h5>
                            </Col>
                        </Row>

                        
                        <Row>
                            <Col sm={4} >
                        <h4 className="mb-3">Author : </h4>
                            </Col>
                            <Col sm={8}>
                                <h5> {detail.author?.name}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                        <h4 className="mb-3">Genre : </h4>

                            </Col>
                            <Col sm={8}>
                               
                            <Row sm={6}>    
                            { detail.genres.map((gen,ind)=>
                            (
                                    <NavLink to={"/genre/"+gen.slug} className={"me-1"} key={ind}>
                                        <h5 >{gen.name}</h5>
                                        
                                    </NavLink>
                                    
                                ))}</Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                        <h4 className="mb-3">Published date : </h4>
                            </Col>
                            <Col sm={8}>
                                <h5> {detail.publishedDate}</h5>
                            </Col>
                        </Row>
                       

                    </Col>
                    
                   
                    

                </Row>
                <Row >
                  
                    <Col  sm='6' md='3' lg='6' className="mx-4 my-3 mb-3">
                       <h4>Description</h4>
                     </Col>
                     <Col  sm={12} className=" my-3 mb-3">
                       <p>{detail.publicationDetail}</p>
                     </Col>
      
                </Row>
            </Container>

                    
            <Container fluid className=" bg-light  mb-3">
                <Row >
                    <div className="col-12 mb-3">
                        <h4> Recommendations</h4>
                        
                    </div>
                </Row>
                <BookCardComponent/>
               
            </Container>
                        </>:<p className="text-danger h4">Book does not exists</p>
                     }

                        </>
                    }
               
            
                </Col>

            </Row>

           
        </Container>
    )
}
export default BookDetailPage;



