// import { TestBed, waitForAsync } from "@angular/core/testing"
// import { AuthGuardService } from "./auth.guard"
// import { of } from "rxjs"

// describe('AuthGuardService', ()=> {

//     const mockCurrentUser = {
//         currentUser$ : of<{id:string} | null>(null),
//     }

//     const initialState = {

//     }

//     beforeEach(()=> {
//         TestBed.configureTestingModule({
//             providers:[
//                 provideMockStore({initialState}),
//                 {
//                     useValue:mockCurrentUser,
//                 }
//             ]
//         })
//     })
//     it('returns true for logged in user', waitForAsync(() => {
//         TestBed.runInInjectionContext(()=> {
//             return AuthGuardService()
//         }).subscribe((result)=>{
//             expect(result).toBe(true)
//         })
//     }))
// })

// function provideMockStore(arg0: { initialState: {} }): any {
//     throw new Error("Function not implemented.")
// }
