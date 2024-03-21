import { ComponentFixture, TestBed } from "@angular/core/testing"
import { MockStore, provideMockStore } from'@ngrx/store/testing'
import { ActivatedRoute } from "@angular/router"
import { NavBarComponent } from "./navbar.component"
import { By } from "@angular/platform-browser"

describe('NavBarComponent', () => {
    let component : NavBarComponent
    let fixture : ComponentFixture<NavBarComponent>
    let store: MockStore;
    let initialState ={

        currentUser:null
              
    }
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[NavBarComponent],
            providers:[
                provideMockStore({initialState}),
                { provide: ActivatedRoute, useValue: ActivatedRoute },
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(NavBarComponent)
        component = fixture.componentInstance
        store = TestBed.inject(MockStore)
        fixture.detectChanges()
    
    })
    it('creates a component', () => {
        expect(component).toBeTruthy();
    });
    it('renders buttons', ()=>{
        const user = fixture.debugElement.query(By.css('[data-testId="currentUser"]'))
        expect(user).toBeTruthy()
        const buttons = fixture.debugElement.query(By.css('[data-testId="buttons"]'))
        expect(buttons.nativeElement.textContent).toContain('Register')
    })


})