import { Container, Row, Col,  Card } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import  Pagination from "react-bootstrap/Pagination"

import GenreComponent from "./genrecomponent"


const GenrePage = () => {
   
    return (
        <Container fluid>
            <Row>
                <Col   >
                    
            <Container fluid className=" bg-light  mb-3">
                <Row >
                    <div className="col-12 mb-3">
                        <h4>All Genres</h4>
                        
                    </div>
                </Row>
        </Container>
            <GenreComponent/>
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
export default GenrePage;



