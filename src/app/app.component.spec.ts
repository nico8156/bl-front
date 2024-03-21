import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {

const initialState = {

}

beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [AppComponent],
        providers:[
        provideMockStore({initialState}),
    ]
    }).compileComponents();
});

it('should create the app', () => {
const fixture = TestBed.createComponent(AppComponent);
const app = fixture.componentInstance;
expect(app).toBeTruthy();
});
})

//   // it(`should have the 'blog-livres' title`, () => {
//   //   const fixture = TestBed.createComponent(AppComponent);
//   //   const app = fixture.componentInstance;
//   //   expect(app.title).toEqual('blog-livres');
//   // });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, blog-livres');
//   });
// });
