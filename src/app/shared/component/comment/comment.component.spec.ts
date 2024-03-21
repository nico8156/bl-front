import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CommentComponent } from "./comment.component"
import { By } from "@angular/platform-browser"

describe('CommentComponent', ()=> {
    let component : CommentComponent  
    let fixture : ComponentFixture<CommentComponent>

  beforeEach(()=>{
    TestBed.configureTestingModule({
        imports:[CommentComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CommentComponent)
    component = fixture.componentInstance
    component.comment = {commentId: 12, userDto: {username:'user', userRole:'user',photo:'some photo'}, googleId: 'ggId', parentId: null, title: 'title', content:'content'}
    fixture.detectChanges()

  })  
    it('creates a component', () => {
        expect(component).toBeTruthy();
    })
    it('should render the photo of user',()=> {
        const photo = fixture.debugElement.query(By.css('[data-testId="photo"]'))
        expect(photo).toBeTruthy()
    })
    it('should render the correct username',()=> {
        const username = fixture.debugElement.query(By.css('[data-testId="username"]'))
        expect(username).toBeTruthy()
        expect(username.nativeElement.textContent).toEqual(' user ')
    })
    it('should render the correct title',()=> {
        const title = fixture.debugElement.query(By.css('[data-testId="title"]'))
        expect(title).toBeTruthy()
        expect(title.nativeElement.textContent).toEqual(' title ')
    })
    it('should render the correct content',()=> {
        const content = fixture.debugElement.query(By.css('[data-testId="content"]'))
        expect(content).toBeTruthy()
        expect(content.nativeElement.textContent).toEqual(' content ')
    })
})