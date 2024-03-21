import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CommentFormComponent } from "./commentForm.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { By } from "@angular/platform-browser"

describe('CommentFormComponent', () => {
    let component : CommentFormComponent
    let fixture : ComponentFixture<CommentFormComponent>
    
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[CommentFormComponent, FormsModule, ReactiveFormsModule]
        }).compileComponents()

        fixture = TestBed.createComponent(CommentFormComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    
    })
    it('creates a component', () => {
        expect(component).toBeTruthy();
    })
    it('should render the h1 element with correct content', () => {
        const h1Element = fixture.debugElement.query(By.css('h1'));
        expect(h1Element).toBeTruthy()
        expect(h1Element.nativeElement.textContent).toContain('Ecrire un commentaire'); // Check if h1 content is correct
    })
    it('should render the form with input fields and a button', () => {
        const formElement = fixture.debugElement.query(By.css('form'))
        expect(formElement).toBeTruthy()
        
        const inputElements = fixture.debugElement.queryAll(By.css('input'))
        expect(inputElements.length).toBe(1)
        
        const textareaElement = fixture.debugElement.query(By.css('textarea'))
        expect(textareaElement).toBeTruthy()
        
        const buttonElement = fixture.debugElement.query(By.css('button'))
        expect(buttonElement).toBeTruthy()
    })
})