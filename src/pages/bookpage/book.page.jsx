import { Container, Row, Col } from "react-bootstrap"
import  Pagination from "react-bootstrap/Pagination"
import BookCardComponent from "./book-card.component"

                                  
const BookPage = () => {
    
    return (
        <Container fluid>
            <Row>
                <Col   >
                    
            <Container fluid className=" bg-light  mb-3 ">
                <Row >
                    <div className="col-12 my-3">
                        <h4>All Books</h4>
                        
                    </div>
                </Row>
               <BookCardComponent/>

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
export default BookPage;



