import { Component, Input, inject } from "@angular/core";
import { CreateCommentResponseInterface } from "../comments/types/createCommentResponse.interface";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";

@Component({
    selector:'bl-comment',
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss',
    standalone: true,
    imports: [CommonModule]
})

export class CommentComponent {
    
    @Input() comment!:CreateCommentResponseInterface
    @Input() username: string =''

}