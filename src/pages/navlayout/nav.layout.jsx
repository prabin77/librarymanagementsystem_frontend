import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Logo } from "./navlayout";
import { Nav, Navbar, NavDropdown, Container, Form, Button } from "react-bootstrap";
import { genreSvc } from "../../cms/admingenre";
import authSvc from "../auth/auth.service";

const NavLayout = () => {
    const navigate = useNavigate()

const [genList,setGenList]= useState()
const[query,setQuery]= useState()
const [loggedInUser,setLoggedInUser]= useState()
const loadAllGen= useCallback(async() =>{
    try{
        let response =await genreSvc.listGenre()
        setGenList(response.data.data )  
    }catch(exception){
        throw exception;
    }
},[])

const getLoggedInUser=async()=>{
    try{
        let response = await authSvc.getLoggedInUser()
        setLoggedInUser(response.data)
    }catch(exception){
        throw exception
    }

}
    
const handleLogout=async (e)=>{
   try{ e.preventDefault();
    let response = await authSvc.logoutUser()

    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")

    navigate("/login")
}catch(exception){
    console.log(exception)
}
}

useEffect(()=>{
    loadAllGen()
    getLoggedInUser()
},[])

const handleSubmit=(e)=>{
    e.preventDefault()
    let params ="search= "+query
    navigate("/search?"+params )
}
    return (

        <Container>
            <Navbar expand="lg" className="bg-body-tertiary  mb-4" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <NavLink to="/"><img style={Logo} src="data:image/png;base64,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" /></NavLink>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink className='nav-link' to="/">Home</NavLink>
                            <NavLink className='nav-link' to="/book">Books</NavLink>

                           {
                            genList ? <NavDropdown title="Genre" id="nav-dropdown">
                                {
                                    genList.map((genInfo,index)=>(

                                        <NavLink key={index} className={'dropdown-item'} to={'/genre/'+genInfo.name}>
                                            {genInfo.name}
                                            
                                        </NavLink>
                                    ))
                                    
                                }
                            </NavDropdown> :<>Genre </>
                           }
                            
                            
                            
                        </Nav>
                        <Form className="d-flex px-5" role="search" onSubmit={handleSubmit}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                name="search"
                                onChange={(e)=>{setQuery(e.target.value)}}
                                className="me-2 "
                            />
                            <Button type="submit" variant="outline-success">Search</Button>
                        </Form>

                           {
                            loggedInUser ? <> 
                            <NavDropdown title={<span><i className="fa-solid fa-user"></i></span>} style={{ color: "#8d9096", padding: "5px" }} id="navbaDropdown">
                            <NavLink style={{ paddingLeft: "15px" }} to="user"><i className="fa-solid fa-user"></i>  My Profile</NavLink>
                            <NavDropdown.Item href="/setting">
                                <i className="fa-solid fa-gear"></i>   Setting
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                <i className="fa-solid fa-book"></i>   Borrowed books
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket" ></i>   Logout
                            </NavDropdown.Item>
                        </NavDropdown></>:<><NavLink className='nav-link m-2'style={{color:'white'}} to="/login" >
                            Login
                        </NavLink></>
                           }

                       

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet></Outlet>

            <Navbar expand="lg" className=" bg-body-tertiary" bg="dark" data-bs-theme="dark" >
                <Container fluid style={{ color: "#ffffff8c", padding: "30px" }} >

                    <NavLink to="/">
                        <img className="img img-fluid " style={{ height: "120px", paddingLeft: "20px" }}
                            src="data:image/png;base64,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" />

                        <p style={{ width: "320px", paddingLeft: "20px", height: "200px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga cum expedita veniam, possimus tempore nostrum, magnam totam aliquid voluptatem odio labore sequi sit harum laborum ab quo deserunt nisi ratione?</p>
                    </NavLink>
                    <NavLink  className=" col-lg-5 col-md-4 text-center mb-4" to="map">
                        Connect with us
                        <hr />
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.0299327310045!2d85.34223307505002!3d27.685469726456773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198d99470043%3A0x167d008efb47d64c!2sBroadway%20Infosys!5e0!3m2!1sen!2snp!4v1692676392652!5m2!1sen!2snp" width="100%" height="250"  allowFullScreen="" loading="lazy" ></iframe>
                    </NavLink>
                    <NavLink to="about-us" style={{ paddingRight: "20px", height: "320px", width: "250px" }}>About us
                        <hr />
                        <NavLink className="mb-3 nav-link" to="#">Contact us</NavLink>

                        <NavLink className="mb-3 nav-link" to="#">License and agreement</NavLink>

                           {
                            loggedInUser? <></>:<>
                            <NavLink className="mb-3" to="/login">Login</NavLink>
                            </>
                           }
                        
                    </NavLink>



                </Container>

            </Navbar>

            <Navbar expand="lg" className=" bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid className="">

                    <Nav className=" offset-md-5" style={{ color: '#ffffff8c' }}>
                        <NavLink className="fa-brands fa-facebook me-2"></NavLink>
                        <NavLink className="fa-brands fa-google me-2"></NavLink>
                        <NavLink className="fa-brands fa-instagram me-2"></NavLink>
                        <NavLink className="fa-brands fa-twitter me-2"></NavLink>
                    </Nav>
                </Container>
            </Navbar>


        </Container>


    )
}

export default NavLayout;