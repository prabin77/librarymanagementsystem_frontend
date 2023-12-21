import AdminAuthor from "./admin.author";
import AuthorService from "./author.service";
import AuthorCreate from "./admin.author.create";
import AdminAuthorEdit from "./author.edit";

const authorSvc = new AuthorService()

export  {AdminAuthor,authorSvc , AuthorCreate, AdminAuthorEdit}