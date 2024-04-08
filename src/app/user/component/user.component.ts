import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CustomValidators } from "../../shared/validators/custom.validator";
import { Store, select } from "@ngrx/store";
import { Subscription, combineLatest, filter } from "rxjs";
import { selectCurrentUser } from "../../auth/store/reducers";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { UpdateRequestInterface } from "../../auth/types/updateRequest.interface";
import { authActions } from "../../auth/store/actions";
import { selectLinks } from "../../shared/component/navlink/store/reducers";
import { linksActions } from "../../shared/component/navlink/store/actions";
import { SaveLibraryRequestInterface } from "../../shared/component/navlink/types/saveLibraryRequest.interface";
import { LinksResponseInterface } from "../../shared/component/navlink/types/linksResponse.interface";

@Component({
    selector: 'bl-user',
    templateUrl: './user.component.html',
    styleUrls:['./user.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule]
})

export class UserComponent implements OnInit{

    fb = inject(FormBuilder)
    store = inject(Store)

    selectedLink: LinksResponseInterface|null = null

    data$ = combineLatest({
        user: this.store.select(selectCurrentUser),
        links: this.store.select(selectLinks)
    })
    currentUser?: CurrentUserInterface
    currentUserSubscription? : Subscription

    form = this.fb.nonNullable.group({
        username: ['', [Validators.required, Validators.minLength(2)]],
        photo: ['', [Validators.minLength(6)]]
    })

    linkForm = this.fb.nonNullable.group({
        linkName: ['', [Validators.required, Validators.minLength(1)]]
    })

    ngOnInit(): void {
        this.currentUserSubscription = this.store
        .pipe(select(selectCurrentUser), filter(Boolean))
        .subscribe((currentUser) => {
          this.currentUser = currentUser
          this.initializeForm()
        })
    }

    initializeForm() {
        if (!this.currentUser) {
            throw new Error('current user is not set')
          }
        this.form.patchValue({
            username: this.currentUser.username,
            photo: this.currentUser.photo,
          })
    }

    onSubmit(){
        console.log(this.form.getRawValue())
        const request:UpdateRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(authActions.update({request}))
    }

    isUserInDb(){
        const request: string = this.form.get('username')?.value ?? ''
        console.log(request)
    }

    onEdit(link: LinksResponseInterface):void{
        this.linkForm.patchValue({
            linkName: link.libraryName
        })
        this.selectedLink = link
    }
    
    onSubmitFormLink(){
        const id = this.selectedLink?.libraryId ?? 0
        const request: SaveLibraryRequestInterface = {
            library:{
                name: this.linkForm.get('linkName')?.value ?? ''
            }
        }
        this.store.dispatch(linksActions.updateLink({request,id}))
        this.linkForm.reset()
        this.selectedLink = null
    }
    onDelete(id: number){
        this.store.dispatch(linksActions.deleteLink({id}))
    }
}