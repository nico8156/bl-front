import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LinksResponseInterface, LinksResponseInterfaceFinal } from "../types/linksResponse.interface";

export const linksActions = createActionGroup({
    source: 'links',
    events: {
        'Get Links': props<{id: number}>(),
        'Get Links Success': props<{data: LinksResponseInterface[]}>(),
        'Get Links Failure': emptyProps(),
    }
})