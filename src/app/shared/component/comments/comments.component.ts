import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { commentsActions } from "./store/actions";
import { combineLatest, concatMap, filter, map, pluck, take } from "rxjs";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CommentFormComponent } from "../commentForm/commentForm.component";
import { selectBook } from "../../../bookBlog/store/reducers";
import { CreateCommentRequestInterface } from "./types/createCommentRequest.interface";
import { CommentComponent } from "../comment/comment.component";
import { CommonModule } from "@angular/common";
import { selectComments } from "./store/reducers";
import { CreateCommentResponseInterface } from "./types/createCommentResponse.interface";

@Component({
    selector:'bl-comments',
    templateUrl:'comments.component.html',
    styleUrl:'comments.component.scss',
    standalone: true,
    imports: [CommentFormComponent, CommentComponent, CommonModule],
})

export class CommentsComponent implements OnInit{

    route = inject(ActivatedRoute)
    store = inject(Store)
    
    googleId = this.route.snapshot.paramMap.get('bookId') ?? ''

    data$ = combineLatest({
        user : this.store.select(selectCurrentUser),
        book: this.store.select(selectBook),
        comments: this.store.select(selectComments),
    })
    
    ngOnInit(): void {
        
        this.store.dispatch(commentsActions.getComments({googleId: this.googleId}))
        

    }
    
    onSubmit({request}:{request:CreateCommentRequestInterface}){

        this.data$.pipe(
            take(1)).
            subscribe(data => {

            const id = data.user?.userId
            const googleId = data.book?.googleId

            if(id && googleId){
                this.store.dispatch(commentsActions.createComment({request, id, googleId}))
                
            }
        })
        
    }
    getReplies(id: number): any{
        let currentReplies
        return this.store.select(selectComments).pipe(map(curReplies=> curReplies.filter(curReplie => curReplie.parentId == id)))
        // this.data$.pipe(
        //     pluck('comments'),
        //     map(comments => comments.filter(comment => comment.parentId == id)),
        //     map(curReplies => { return currentReplies = curReplies}),
        // )
    }
}