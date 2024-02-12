import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { bookInfoActions } from "../store/actions";
import { combineLatest, map } from "rxjs";
import { selectBookInfodata, selectError, selectIsLoading } from "../store/reducers";
import { CommonModule } from "@angular/common";
import { BookInfoService } from "../service/bookInfo.service";
import { selectLinksData } from "../../shared/component/navlink/store/reducers";

@Component({
    selector:'bl-bookInfo',
    templateUrl:'./bookInfo.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink]
})

export class BookInfoComponent implements OnInit{
    route = inject(ActivatedRoute)
    store = inject(Store)
    bookInfoService = inject(BookInfoService)

    slug = this.route.snapshot.paramMap.get('slug') ?? ''

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        book: this.store.select(selectBookInfodata),
        links: this.store.select(selectLinksData)
      })
    
    ngOnInit(): void {
        this.store.dispatch(bookInfoActions.getBookInfo({slug: this.slug}))
    }
    saveBook(){
        
        
        
    }
}