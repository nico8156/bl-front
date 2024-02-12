import { Route } from "@angular/router";
import { BooksByLibraryComponent } from "./component/booksByLibrary.component";


export const routes: Route[] = [
    {
        path: '',
        component: BooksByLibraryComponent,
    },
]