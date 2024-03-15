import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LinksResponseInterface } from "../types/linksResponse.interface";
import { SaveLibraryRequestInterface } from "../types/saveLibraryRequest.interface";


export const linksActions = createActionGroup({
    source: 'Links',
    events: {
        'Get Links': props<{id: number}>(),
        'Get Links Success': props<{links: LinksResponseInterface[]}>(),
        'Get Links Failure': emptyProps(),

        'Save Link' : props<{request: SaveLibraryRequestInterface}>(),
        'Save Link success' : props<{link: LinksResponseInterface}>(),
        'Save Link failure' : emptyProps(),

        'Update Link' : props<{request: SaveLibraryRequestInterface, id: number}>(),
        'Update Link success' : props<{link: LinksResponseInterface}>(),
        'Update Link failure' : emptyProps(),

        'Delete Link' : props<{id: number}>(),
        'Delete Link success' : props<{link: LinksResponseInterface}>(),
        'Delete Link failure' : emptyProps(),
    }
})