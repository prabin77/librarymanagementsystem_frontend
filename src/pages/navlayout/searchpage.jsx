import { Container, Row,Col,Card,Badge } from "react-bootstrap";
import { useSearchParams ,NavLink } from "react-router-dom";
import { useState ,useCallback , useEffect} from "react";
import { bookSvc } from "../../cms/adminbook";
import BookCardComponent from "../bookpage/book-card.component";
 const SearchPage=()=>{
let[query,setQuery]= useSearchParams();
let [bookList, setBookList] = useState()


const fetchBookList = useCallback(async() => {
    try{
        let response = await bookSvc.getBooksByKeyword(query.get("search"))
        setBookList(response.data)
    } catch(exception) {
        throw exception
    }
},[query])

useEffect(() => {
    fetchBookList()
}, [query])

    return(
        <>
          <Container className="my-5 bg-light" fluid>
            <Row className="p-3">
                <Col sm={12}>
                <h1 className="text-center">
                    Search Result of <em>{query.get("search")}</em>
                </h1>
                </Col>

            </Row>
            <Row>
                {
                    bookList && bookList.length >0 ? <>
                        {
                            bookList.map((book, key) => (
                              <Col sm={2}>
                              <Card >
                                <NavLink
                                  className={"nav-link"}
                                  to={'/book/'+book.slug}
                                >
                                  <Card.Img variant="top" src={import.meta.env.VITE_IMAGE_URL+"/uploads/books/"+book.images[0]} />
                                </NavLink>
                                <Card.Body>
                                  <Card.Title>
                                    <NavLink
                                      className={"nav-link"}
                                      to={'/book/'+book.slug}
                                    >
                                      {book.title}
                                    </NavLink>
                                  </Card.Title>
                                  <Card.Text as="div">
                                    
                                    {
                                        (book.genres && book.genres.length > 0) ? book?.genres.map((gen, ind) => (
                                        <NavLink to={"/genre/"+gen.slug} className={"me-1"} key={ind}>
                                            <Badge bg="warning">{gen.name}</Badge>
                                        </NavLink>
                                        )) : <></>
                                    }
                                    
                                    {
                                      book.author ?   <NavLink to={"/author/"+book.author.slug}>
                                      <Badge bg="info">{book.author.name}</Badge>
                                    </NavLink>
                                   : <></>
                                    }
                                    
                                    
                                    
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                              </Col>  
                              
                                
                                
                            ))
                        }
                    </> : <>
                    <Col sm={12}>
                        <p className="p-3 text-danger">Book does not exists on this search</p>
                    </Col>
                    </>
                }
            </Row>
          </Container>
        </>
    )
 }
 export default SearchPage;