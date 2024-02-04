import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/home.page";
import NavLayout from "./pages/navlayout/nav.layout";
import LoginPage from "./pages/loginpage/login.page";
import GenrePage from "./pages/genrepage/genre.page";
import BookPage from "./pages/bookpage/book.page";
import AdminLayout from "./cms/admin/admin.dashboard/admin.layout";
import AdminDash from "./cms/admin/admin.dashboard/admin.page";
import GenreBookPage from "./pages/genrepage/genrebook.page";
import BookDetailPage from "./pages/bookpage/book.detail.page";
import MyProfilePage from "./pages/myprofilepage/user.detail.page";
import { Provider } from "react-redux";
import RegisterPage from "./pages/registeruser/register.page";
import ActivateUser from "./pages/auth/activate.user.page";
import {AdminBanner, BannerCreate ,AdminBannerEdit} from "./cms/adminbanner";
import store from "./store";
import { ToastContainer } from "react-bootstrap";
import {AdminGenre, GenreCreate ,AdminGenreEdit} from "./cms/admingenre";
import { AdminBookList,AdminBookCreate,AdminBookEdit } from "./cms/adminbook";
import { AdminAuthor, AuthorCreate,AdminAuthorEdit } from "./cms/adminauthor";
import { AdminUser, AdminUserEdit } from "./cms/adminuser";
import SearchPage from "./pages/navlayout/searchpage";
import UserEdit from "./pages/myprofilepage/user.edit.page";
import SettingPage from "./pages/settings/setting.page";
const Routing = () => {
    return (
       <>
       <Provider store={store}>
       <BrowserRouter>
       <ToastContainer/>
            <Routes>
                <Route path= "/" element={<NavLayout/>}>
                    <Route path="" element={<HomePage/>}></Route>
                    <Route path="register-user" element={<RegisterPage/>}></Route>
                    <Route path="activate/:token" element={<ActivateUser/>}></Route>
                    <Route path="login" element={<LoginPage/>}></Route>
                    <Route path="genre" element={<GenrePage/>}></Route>
                    <Route path="book" element={<BookPage/>}></Route>
                    <Route path="book/genre/:slug" element={<GenreBookPage/>}></Route>
                    <Route path="book/:slug" element={<BookDetailPage/>}></Route>
                    <Route path="user" element={<MyProfilePage/>}></Route>
                    <Route path="user/:id" element={<UserEdit/>}></Route>
                    <Route path="search" element={<SearchPage/>}></Route>
                    <Route path="setting" element={<SettingPage/>}></Route>



                </Route>
                <Route path= "/admin" element={<AdminLayout/>}>
                    <Route path="" element={<AdminDash/>}></Route>

                    <Route path="banner" element={<AdminBanner/>}></Route>
                    <Route path="banner/create" element={<BannerCreate/>}></Route>
                    <Route path="banner/:id" element={<AdminBannerEdit/>}></Route>

                    <Route path="book" element={<AdminBookList/>}></Route>
                    <Route path="book/create" element={<AdminBookCreate/>}></Route>
                    <Route path="book/:id" element={<AdminBookEdit/>}></Route>

                    <Route path="genre" element={<AdminGenre/>}></Route>
                    <Route path="genre/create" element={<GenreCreate/>}></Route>
                    <Route path="genre/:id" element={<AdminGenreEdit/>}></Route>

                    <Route path="author" element={<AdminAuthor/>}></Route>
                    <Route path="author/create" element={<AuthorCreate/>}></Route>
                    <Route path="author/:id" element={<AdminAuthorEdit/>}></Route>

                    <Route path="user" element={<AdminUser/>}></Route>
                    {/* <Route path="user/create" element={<AuthorCreate/>}></Route> */}
                    <Route path="user/:id" element={<AdminUserEdit/>}></Route>

                </Route>
            </Routes>
        </BrowserRouter>
        </Provider>
        </>
    )
}

export default Routing;