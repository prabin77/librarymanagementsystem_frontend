import { Container, Row, Col } from "react-bootstrap"
import  Pagination from "react-bootstrap/Pagination"
import BookCardComponent from "./book-card.component"
import { useState, useCallback, useEffect } from "react"
import { bookSvc } from "../../cms/adminbook"
                                  
const BookPage = () => {
    const[loading, setLoading]=useState(true)
    const [bookDetail,setBookDetail]= useState([])
// const[currentPage, setCurrentPage]= useState(1)
// const[booksPerPage]= useState(12)
console.log(bookDetail)
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

    // const indexOfLastBook= currentPage*booksPerPage;
    // const indexOfFirstBook= indexOfLastBook-booksPerPage
    // const currentBooks= bookDetail?.slice(0,1)?.keys()
  //  const npage= Math.ceil(bookDetail.length/booksPerPage)
 //   const numbers=[...Array(npage+1).keys()].slice(1)

    useEffect(()=>{
   bookListDetail()
    },[])
    return (
        <Container fluid>
            <Row className="my-3">
            <Row >
                    <div className="col-12 my-3">
                        <h4>All Books</h4>
                        
                    </div>
                </Row>
          {
            loading ? <Col><p className="text-center text-danger">Book is loading....</p></Col> : <>
            {
                 bookDetail && bookDetail.data.length > 0 ? <>  
                 {
                   bookDetail.data.map((book, index) => (
                     <Col sm={6} md={4} lg={4} xl={3} xxl={2} key={index} className="mb-3">
                <Col   >
                    
            <Container fluid className=" bg-light  mb-3 ">
                
               <BookCardComponent book={book}/>

            </Container>

            
                </Col>
                </Col>
                  
                  ))
                }
                </> : <Col><p className="text-center text-danger">Book does not exists...</p></Col>
             

}
</>
}


</Row>

            <Pagination className="offset-md-4">
      <Pagination.Prev />
      <Pagination.Item active>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item >{4}</Pagination.Item>
      <Pagination.Item>{5}</Pagination.Item>
      <Pagination.Item >{6}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
        </Container>
    )
}
export default BookPage;



