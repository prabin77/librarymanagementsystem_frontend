import AdminGenre from "./admin.genre";
import GenreService from "./genre.service";
import GenreCreate from "./admin.genre.create";
import AdminGenreEdit from "./genre.edit";

const genreSvc = new GenreService()

export  {AdminGenre,genreSvc , GenreCreate, AdminGenreEdit}