import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { bookFromDbActions } from "../store/actions";
import { combineLatest } from "rxjs";
import { selectBook } from "../store/reducers";
import { CommonModule } from "@angular/common";
import { CommentsComponent } from "../../shared/component/comments/comments.component";

@Component({
    selector: 'bl-book-blog',
    templateUrl: './bookBlog.component.html',
    styleUrl: './bookBlog.component.scss',
    standalone: true,
    imports: [CommonModule, CommentsComponent]
})

export class BookBlogComponent implements OnInit{

    route = inject(ActivatedRoute)
    store = inject(Store)
    
    slug = this.route.snapshot.paramMap.get('bookId') ?? ''

    data$ = combineLatest({
        book : this.store.select(selectBook)
    })
    
    ngOnInit(): void {
        console.log('slug' , this.slug)
        this.store.dispatch(bookFromDbActions.getBookFromDb({googleId: this.slug}))
    }
}