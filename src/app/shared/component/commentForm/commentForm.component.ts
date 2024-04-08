import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreateCommentRequestInterface } from "../comments/types/createCommentRequest.interface";

@Component({
    selector: 'bl-comment-form',
    templateUrl: './commentForm.component.html',
    styleUrls: ['./commentForm.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule]
})

export class CommentFormComponent{

    @Output()
    handleSubmit = new EventEmitter<CreateCommentRequestInterface>();


    fb = inject(FormBuilder)

    commentForm = this.fb.nonNullable.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        parentId: [null]
    })

    onSubmit(){
        this.handleSubmit.emit(this.commentForm.getRawValue())
        this.commentForm.reset()
    }



}