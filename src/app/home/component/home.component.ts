import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, catchError, combineLatest, map } from "rxjs";
import { booksActions } from "../store/actions";
import { selectBooksData, selectError, selectIsLoading } from "../store/reducers";
import { NavLinkComponent } from "../../shared/component/navlink/navlink.component";

@Component({
    selector: 'bl-home',
    templateUrl: 'home.component.html',
    standalone: true,
    imports:[CommonModule, ReactiveFormsModule, FormsModule, RouterLink, NavLinkComponent],
})

export class HomeComponent{

    fb = inject(FormBuilder)
    http = inject(HttpClient)
    store = inject(Store)

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        books : this.store.select(selectBooksData)
    })

    form = this.fb.nonNullable.group({
        recherche: ['']
    })
    onSubmit(){
        const infoDeRecherche = this.form.getRawValue().recherche
        const baseUrl = "https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publisher,volumeInfo/description,volumeInfo/pageCount,%20volumeInfo/imageLinks)&q="
        const fullUrl = baseUrl + infoDeRecherche
        console.log(fullUrl)
        this.store.dispatch(booksActions.getBooks({url: fullUrl}))
    }
        
}
