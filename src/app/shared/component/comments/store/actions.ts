import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateCommentRequestInterface } from "../types/createCommentRequest.interface";
import { CreateCommentResponseInterface } from "../types/createCommentResponse.interface";

export const commentsActions = createActionGroup({
    source: 'Comments',
    events: {
        'Create Comment': props<{request: CreateCommentRequestInterface, id:number, googleId: string}>(),
        'Create Comment success': props<{comment: CreateCommentResponseInterface}>(),
        'Create Comment failure': emptyProps(),

        'Get Comments': props<{googleId: string}>(),
        'Get Comments success': props<{comments: CreateCommentResponseInterface[]}>(),
        'Get Comments failure': emptyProps(),
    }
})