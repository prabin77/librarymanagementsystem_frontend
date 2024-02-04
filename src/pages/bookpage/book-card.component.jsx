import {  Row, Col, Card, Badge, Carousel } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { Img } from "./bookpage"
const BookCardComponent=({book})=>{
  console.log(book)
    
    return( <>
     
              
             
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

                 
        
    </>)
    
}
export default BookCardComponent