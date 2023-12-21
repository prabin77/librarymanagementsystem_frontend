import AdminBookList from "./admin.book.list";
import BookService from "./book.service";
import AdminBookCreate from "./admin.book.create";
import AdminBookEdit from "./admin.book.edit";


const bookSvc= new BookService()
export {AdminBookList,bookSvc,AdminBookCreate,AdminBookEdit}