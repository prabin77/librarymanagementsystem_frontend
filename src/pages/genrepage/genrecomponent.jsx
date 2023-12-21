
import { Row, Col, Card, Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { Img, cardTitle } from "./genrepage"
import { useCallback, useEffect, useState } from "react"
import { genreSvc } from "../../cms/admingenre"

const GenreComponent = () => {
    const [loading, setLoading] = useState(true)
    const [genDetail, setGenDetail] = useState()
    const getGenList = useCallback(async () => {
        try {
            let response = await genreSvc.listGenre()
            setGenDetail(response.data)
        } catch (exception) {
            throw exception
        } finally {
            setLoading(false)
        }
    })

    useEffect(() => {
        getGenList()
    }, [])
    return (
        <>
            <Container style={{ color: "red" }}>

                <Row >

                    {
                        loading ? <Col><p className="text-center text-danger">Genre is loading....</p></Col> : <>
                            {

                                genDetail && genDetail.data.length > 0 ? <>
                                    {
                                        genDetail.data.map((gen, index) => (
                                            
                                              <Col sm={6} md={4}  xl={3} key={index} className="mb-3">
                                                <Row className="m-2">
                                                    <Card >
                                                       <NavLink to={"/genre/"+gen.slug}>
                                                       
                                                            <img src={import.meta.env.VITE_IMAGE_URL + 'uploads/genre/' + gen.image}
                                                               style={Img} className="card-img m-1" alt="genre image" />
                                                        </NavLink>

                                                        <h5 className=" text-center p-1 " style={cardTitle}> {gen.name} </h5>


                                                    </Card>

                                                    </Row>
                                                </Col>
                                            

                                        ))
                                    }
                                </> : <Col><p className="text-center text-danger">Genre does not exists...</p></Col>
                            }
                        </>
                    }




                </Row>

            </Container>

        </>
    )
}
export default GenreComponent;