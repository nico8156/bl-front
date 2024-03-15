import { LinksResponseInterface } from "./linksResponse.interface"

export interface LinksStateInterface{
    isLoading : boolean
    error: string |null
    links: LinksResponseInterface[] | []    
}