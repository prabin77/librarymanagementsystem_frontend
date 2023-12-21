import AdminUser from "./admin.user";
import UserService from "./user.service";
// import UserCreate from "./admin.user.create";
import AdminUserEdit from "./user.edit";

const userSvc = new UserService()

export  {AdminUser,userSvc , AdminUserEdit}