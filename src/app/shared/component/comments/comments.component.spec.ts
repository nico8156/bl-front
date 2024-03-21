import { ComponentFixture, TestBed } from "@angular/core/testing"
import { MockStore, provideMockStore } from'@ngrx/store/testing'
import { ActivatedRoute, convertToParamMap } from "@angular/router"
import { By } from "@angular/platform-browser"
import { CommentsComponent } from "./comments.component"

describe('CommentsComponent', () => {
    let component : CommentsComponent
    let fixture : ComponentFixture<CommentsComponent>
    let store: MockStore;
    let initialState ={
        comments:{
            comments:[{title:'a title', content:'a content', parentId:null}]
        }
    }
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[CommentsComponent],
            providers:[
                provideMockStore({initialState}),
                { provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({ googleId: '123' }) // Provide the paramMap with desired route parameters
                        } }},
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(CommentsComponent)
        component = fixture.componentInstance
        store = TestBed.inject(MockStore)
        fixture.detectChanges()
    
    })
    it('creates a component', () => {
        expect(component).toBeTruthy();
    });
    it('renders comments', ()=>{
        const comments = fixture.debugElement.queryAll(By.css('[data-testId="comments"]'))
        expect(comments.length).toEqual(1)
    })
    it('renders the h1', () => {
        const title = fixture.debugElement.query(By.css('[data-testId="title"]'))
        expect(title).toBeTruthy()
        expect(title.nativeElement.tagName.toLowerCase()).toBe('h1');
        expect(title.nativeElement.textContent).toContain('Ce que les membres en pensent :')
    })
})