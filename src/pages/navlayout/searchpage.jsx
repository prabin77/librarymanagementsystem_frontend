import { Container, Row,Col } from "react-bootstrap";
import { useSearchParams  } from "react-router-dom";
import { useState ,useCallback , useEffect} from "react";
import { bookSvc } from "../../cms/adminbook";
import BookCardComponent from "../bookpage/book-card.component";
 const SearchPage=()=>{
let[query,setQuery]= useSearchParams();
let [BookList, setBookList] = useState()

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
                    productList && productList.length >0 ? <>
                        {
                            productList.map((item, key) => (
                                <Col sm={6} md={3} lg={2} key={key}>
                                    <BookCardComponent 
                                        product={item}
                                    />
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