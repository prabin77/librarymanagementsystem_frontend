import {  Row, Col, Card, Badge } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { bookSvc } from "../../cms/adminbook"

const BookCardComponent=()=>{
    const[loading, setLoading]=useState(true)
    const [bookDetail,setBookDetail]= useState()
    const bookListDetail=useCallback(async()=>{
 try{
    let response = await bookSvc.BookList()
   setBookDetail(response.data)
}catch(exception){
throw exception
}finally{
    setLoading(false)
}
    },[])

    useEffect(()=>{
   bookListDetail()
    },[])
    return( <>
     <Row className="my-3">
          {
            loading ? <Col><p className="text-center text-danger">Book is loading....</p></Col> : <>
            {
              
              bookDetail && bookDetail.data.length > 0 ? <>  
              {
                bookDetail.data.map((book, index) => (
                  <Col sm={6} md={4} lg={4} xl={3} xxl={2} key={index} className="mb-3">
                    <Card >
                            <NavLink to={"/book/"+book.slug}>
                                <img src={import.meta.env.VITE_IMAGE_URL+'uploads/books/'+book.images}
                                    className="card-img-top img img-fluid" alt="Book Image" />
                            </NavLink>
                            <Card.Body>
                            <NavLink  to={"/book/"+book.slug}>
                            <cardTitle> {book.title} </cardTitle>
                                
                                </NavLink>
                            <Card.Text>
                               {/* { book?.genres.map((gen,ind)=>(
                                    <NavLink to={"/genre/"+gen.slug} className={"me-1"} key={ind}>
                                        <Badge bg="warning">{gen.name}</Badge>
                                        
                                    </NavLink>
                                    
                                ))} */}
                                    
                                    
                                
                                <NavLink to={"/author/"+book.author.slug}>
                                        <Badge bg="info">{book.author }</Badge>
                                        
                                    </NavLink>
                                
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
    </>)
    
}
export default BookCardComponent