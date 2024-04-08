import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, catchError, combineLatest, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap } from "rxjs";
import { booksActions } from "../store/actions";
import { selectBooksData, selectError, selectIsLoading } from "../store/reducers";
import { NavLinkComponent } from "../../shared/component/navlink/navlink.component";

@Component({
    selector: 'bl-home',
    templateUrl: 'home.component.html',
    styleUrls:['./home.component.scss'],
    standalone: true,
    imports:[CommonModule, ReactiveFormsModule, FormsModule, RouterLink, NavLinkComponent],
})

export class HomeComponent implements OnInit{

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

    ngOnInit(): void {
        this.form.controls.recherche.valueChanges.pipe(startWith('')).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(saisie => saisie.length > 3),
            switchMap((saisie) => {
                const baseUrl = "https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publisher,volumeInfo/description,volumeInfo/pageCount,%20volumeInfo/imageLinks)&q="
                const fullUrl = baseUrl + saisie
                this.store.dispatch(booksActions.getBooks({url: fullUrl}))
                return of(null)
            })
        ).subscribe()
    }

    // onSubmit(){

    //     // this.recherche$ = this.form.controls.recherche.valueChanges.pipe(startWith('')).pipe(debounceTime(300))
    //     // const search$ = this.form.controls.recherche.valueChanges.pipe(startWith(''))

    //     const infoDeRecherche = this.form.getRawValue().recherche
    //     const baseUrl = "https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publisher,volumeInfo/description,volumeInfo/pageCount,%20volumeInfo/imageLinks)&q="
    //     const fullUrl = baseUrl + infoDeRecherche
    //     console.log(fullUrl)
    //     this.store.dispatch(booksActions.getBooks({url: fullUrl}))
    // }
        
}
