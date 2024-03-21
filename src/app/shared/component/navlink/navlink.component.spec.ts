import { ComponentFixture, TestBed } from "@angular/core/testing"
import { NavLinkComponent } from "./navlink.component"
import { MockStore, provideMockStore } from'@ngrx/store/testing'
import { ActivatedRoute } from "@angular/router"
import { By } from "@angular/platform-browser"

describe('NavLinkComponent', () => {
    let component : NavLinkComponent
    let fixture : ComponentFixture<NavLinkComponent>
    let store: MockStore;
    let initialState ={
        links:{
            isLoading:false,
            links:[{libraryId:12,user:{id:21,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"a name"}]
        }
    }
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[NavLinkComponent],
            providers:[
                provideMockStore({initialState}),
                { provide: ActivatedRoute, useValue: ActivatedRoute },
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(NavLinkComponent)
        component = fixture.componentInstance
        store = TestBed.inject(MockStore)
        fixture.detectChanges()
    
    })
    it('creates a component', () => {
        expect(component).toBeTruthy();
    })
    it('renders links', ()=>{
        const links = fixture.debugElement.queryAll(By.css('[data-testId="links"]'))
        expect(links.length).toEqual(1)
        expect(links[0].nativeElement.textContent).toContain('a name')
    })
    it('renders LOADING', () => {
        store.setState({
            ...initialState,
            links:{...initialState.links, isLoading: true}
        })
        fixture.detectChanges()
        const loading = fixture.debugElement.query(By.css('[data-testid="loading"]'))
        expect(loading).toBeTruthy()
        
    })
})