import { Container, Row, Col, Carousel, Card } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom"
import {cardTitle} from "./genrepage"
import  Pagination from "react-bootstrap/Pagination"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { bookSvc } from "../../cms/adminbook"


const GenreBookPage = () => {
    const params= useParams()
   const [loading,setLoading]=useState(true)
   const [detail,setDetail]= useState()

const getBook =useCallback(async()=>{
    try{
        let response= await bookSvc.getBookByGenre(params.slug)
        setDetail(response.data)
    }catch(exception){
        toast.error("Error fetching genre book")
    }finally{
        setLoading(false)
    }
},[params])

   useEffect(()=>{
    // getBook()

   },[])

    return (
        <Container fluid>
            <Row>
                <Col   >
                    
            <Container fluid className=" bg-light  mb-3">
                <Row >
                    <div className="col-12 mb-3 mt-2">
                        <h4> {params.slug}</h4>
                        
                    </div>
                </Row>
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
                            <NavLink to="/book/:bookSlug">
                                <img src="https://www.nicepng.com/png/detail/895-8959915_please-note-jk-rowling-harry-potter-book-cover.png"
                                    className="card-img-top" alt="First Category" />
                            </NavLink>

                            <h5 className=" text-center p-1 " style={cardTitle}> Harry Potter I </h5>


                        </Card>

                    </Col>
                   
                    
                   
                    

                </Row>
                
            </Container>

    
                        </>:<p className="text-danger h4">Book does not exists</p>
                     }

                        </>
                    }
               
            
                </Col>

            </Row>

            </Container>

            
                </Col>

            </Row>

            <Pagination className="offset-md-4">
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item active>{4}</Pagination.Item>
      <Pagination.Item>{5}</Pagination.Item>
      <Pagination.Item disabled>{6}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
        </Container>
    )
}
export default GenreBookPage;



