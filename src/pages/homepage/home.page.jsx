import { Container, Row, Col, Carousel, Card, CarouselItem } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { cardTitle, carouselItem } from "./homepage"
import BookPage from "../bookpage/book.page"
import { useEffect, useState } from "react"
import { bannerSvc } from "../../cms/adminbanner"
import GenreComponent from "../genrepage/genrecomponent"
import BookCardComponent from "../bookpage/book-card.component"

const HomePage = () => {
    const [loading, setLoading] = useState(true)
    const [bannerDetail, setBannerDetail] = useState()
    console.log(bannerDetail)
    const getBanner = async () => {
        try {
            let response = await bannerSvc.listBanner()
            setBannerDetail(response.data.data)

        } catch (exception) {
            throw exception
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getBanner()
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col   >
                    {loading ? <p className="text-center text-danger">Loading...</p> : <>

                        <Container lg='12' className="mb-3">

                            <Carousel   >
                                {

                                    bannerDetail && bannerDetail.map((singleBanner, index) => (
                                       <Container md={6}>
                                       <CarouselItem className={((index === 0) ? 'active' : '')} key={index}>
                                            <img src={import.meta.env.VITE_IMAGE_URL + "/uploads/banners/" + singleBanner.image} className=" w-100" style={carouselItem} alt="Banner Image" />
                                        </CarouselItem>
                                    </Container>
                                    ))
                                }

                            </Carousel>
                        </Container>
                    </>
                    }

                    <Container fluid className=" mb-3">
                        <Row >
                            <Col lg='6'md='7' className="offset-md-3 ">

                                <NavLink to="#">
                                    <img src="https://img.freepik.com/premium-psd/online-book-store-banner-template_23-2149043284.jpg"
                                        className="img img-fluid" />
                                </NavLink>

                            </Col></Row>
                    </Container>


                    <Container fluid className=" bg-light  mb-3">
                        <div >
                            <Row className="mb-2">
                                <h4 className="col-11"> All Genres</h4>
                                <NavLink to="/genre" className="col-1"> View All</NavLink>
                            </Row>
                        </div>
                        <Row  >
                            <GenreComponent />

                        </Row>
                    </Container>


                    <Container fluid className=" bg-light  mb-3">
                        <div >
                            <Row className="mb-2">
                                <h4 className="col-11"> All Books</h4>
                                <NavLink to="/book" className="col-1"> View All</NavLink>
                            </Row>
                        </div>
                        <Row >
                         <BookPage />
                        </Row>
                    </Container>

                </Col>

            </Row>



        </Container>
    )
}
export default HomePage;



