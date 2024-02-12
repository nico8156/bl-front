import { LinksResponseInterface, LinksResponseInterfaceFinal } from "./linksResponse.interface"

export interface LinksStateInterface{
    isLoading : boolean
    error: string |null
    data: LinksResponseInterface[] | null    
}