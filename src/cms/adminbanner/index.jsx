import AdminBanner from "./admin.banner";
import BannerService from "./banner.service";
import BannerCreate from "./admin.banner.create";
import AdminBannerEdit from "./banner.edit";

const bannerSvc = new BannerService()

export  {AdminBanner,bannerSvc , BannerCreate, AdminBannerEdit}