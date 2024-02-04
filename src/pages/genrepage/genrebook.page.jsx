import { Container, Row, Col, Carousel, Card,Badge } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom"
import {cardTitle} from "./genrepage"
import  Pagination from "react-bootstrap/Pagination"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { bookSvc } from "../../cms/adminbook"
import { genreSvc } from "../../cms/admingenre"
import BookCardComponent from "../bookpage/book-card.component"


const GenreBookPage = () => {
    const params= useParams()
   const [loading,setLoading]=useState(true)
   const [detail,setDetail]= useState()
console.log(detail)
const getBook =useCallback(async()=>{
    try{
        let id= await genreSvc.getGenreBySlug(params.slug)
        
        let response= await bookSvc.getBookByGenre(id)
        setDetail(response.data)
    }catch(exception){
        console.log(exception)
        toast.error("Error fetching genre book")
    }finally{
        setLoading(false)
    }
},[params])

   useEffect(()=>{
     getBook()

   },[])

    return (
        <Container fluid>

<Row className="my-3">
          {
            loading ? <Col><p className="text-center text-danger">Book is loading....</p></Col> : <>
            {
              
              detail && detail.length > 0 ? <>  
              {
                detail.map((book, index) => (
                  <Col sm={6} md={4} lg={4} xl={3} xxl={2} key={index} className="mb-3">
                    <Card >
                      <Col>
                      <Carousel>
                           { 
                           book.images && book.images.map((img,index)=>(

                            <Carousel.Item key={index}>
                                <img src={import.meta.env.VITE_IMAGE_URL+'uploads/books/'+img}
                                    className="card-img-top img img-fluid"  />
                            </Carousel.Item>
                           ))
                          
}
                            </Carousel>
                      
                      </Col>
                            
                            <Card.Body>
                            <NavLink  to={"/book/"+book.slug}>
                            <Card.Title> {book.title} </Card.Title>
                                
                                </NavLink>
                            <Card.Text>
                               { book?.genres.map((gen,ind)=>(
                                    <NavLink to={"/genre/"+gen.slug} className={"me-1"} key={ind}>
                                        <Badge bg="warning">{gen.name}</Badge>
                                        
                                    </NavLink>
                                    
                                ))}
                                    
                                    
                                {
                                  book.author? <> <NavLink to={"/author/"+book.author.slug}>
                                  <Badge bg="info">{book.author.name }</Badge>
                                  
                              </NavLink></>:<></>

                                  
                                }
                               
                                
                            </Card.Text>
                            

                            </Card.Body>


                        </Card>

                  </Col>
                  
                ))
              }
              </> : <Col><p className="text-center text-danger">Book does not exists...</p></Col>
            }
            </>
          }


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



