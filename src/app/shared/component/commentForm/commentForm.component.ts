import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreateCommentRequestInterface } from "../comments/types/createCommentRequest.interface";

@Component({
    selector: 'bl-comment-form',
    templateUrl: './commentForm.component.html',
    styleUrl: './commentForm.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule]
})

export class CommentFormComponent{

    @Input() initialTitle: string = ''
    @Input() intialContent: string = ''

    @Output()
    handleSubmit = new EventEmitter<CreateCommentRequestInterface>();


    fb = inject(FormBuilder)

    commentForm = this.fb.nonNullable.group({
        title: [this.initialTitle, Validators.required],
        content: [this.intialContent, Validators.required],
        parentId: [null]
    })

    onSubmit(){
        this.handleSubmit.emit(this.commentForm.getRawValue())
        this.commentForm.reset()
    }



}