import { Component, Input, OnInit, inject } from "@angular/core";
import { CreateCommentResponseInterface } from "../comments/types/createCommentResponse.interface";
import { CurrentUserInterface } from "../../types/currentUser.interface";
import { Observable, combineLatest, pipe } from "rxjs";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { selectCurrentUser } from "../../../auth/store/reducers";

@Component({
    selector:'bl-comment',
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss',
    standalone: true,
    imports: [CommonModule]
})

export class CommentComponent implements OnInit{

    store = inject(Store)

    canReply: boolean = false
    canEdit: boolean = false
    canDelete: boolean = false
    
    @Input() comment!:CreateCommentResponseInterface
    @Input() username!:string|undefined
    @Input() replies!:CreateCommentResponseInterface[]|undefined

    ngOnInit(): void {

    }


}