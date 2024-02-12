import { FormatedBookForDb } from "../../bookInfo/types/formatedBookForDb";
import { LinksResponseInterface } from "../../shared/component/navlink/types/linksResponse.interface";


export interface GetBooksByLibResponseInterface{

        libraryBookId: number,
        library: LinksResponseInterface    
        book: FormatedBookForDb

}