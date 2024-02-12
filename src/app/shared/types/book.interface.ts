export interface BookInterface{
        id: string
        volumeInfo:{
            title: string
            authors?:string[]
            publisher?: string
            description?: string
            pageCount: number
            imageLinks?:{
                smallThumbnail: string
                thumbnail: string
            }
        }
    }
