import { linksReducer, initialState } from "./reducers"
import * as linksActions from './actions'

describe('linksReducer',() => {
    it('returns a default state', ()=> {
        const action = {type: 'Unknown'}
        const state = linksReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            links: []
        }
        expect(state).toEqual(newState)
    })
    it('Get Links', ()=> {
        const action = linksActions.linksActions.getLinks({id:12})
        const state = linksReducer(initialState, action)
        const newState = {
            isLoading: true,
            error: null,
            links: []
        }
        expect(state).toEqual(newState)
    })
    it('Get Links Success', ()=> {
        const action = linksActions.linksActions.getLinksSuccess({links:[{libraryId:12,user:{id:21,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"a name"}]})
        const state = linksReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            links: [{
                libraryId:12,
                user:{
                    id:21,
                    username:'user',
                    email:'email',
                    password:'password',
                    userRole:'user',
                    enabled:true,
                    accountNonExpired:true,
                    accountNonLocked:true,
                    
                    credentialsNonExpired:true
                },
                libraryName:"a name"}]
        }
        expect(state).toEqual(newState)
    })
    it('Get Links Failure', ()=> {
        const action = linksActions.linksActions.getLinksFailure()
        const state = linksReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            links: []
        }
        expect(state).toEqual(newState)
    })
    it('Save Link', ()=> {
        const action = linksActions.linksActions.saveLink({request:{
            library : {
                name : "name"
            }
        }})
        const state = linksReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            links: []
        }
        expect(state).toEqual(newState)
    })
    it('Save Link success', ()=> {
        const action = linksActions.linksActions.saveLinkSuccess({link:{libraryId:12,user:{id:21,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"a name"}})
        const state = linksReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            links: [{libraryId:12,user:{id:21,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"a name"}]
        }
        expect(state).toEqual(newState)
    })
    it('Save Link failure', ()=> {
        const action = linksActions.linksActions.saveLinkFailure()
        const state = linksReducer(initialState, action)
        const newState = {
            isLoading: false,
            error: null,
            links: []
        }
        expect(state).toEqual(newState)
    })
    it('Update Link', ()=> {
        const action = linksActions.linksActions.updateLink({request:
            {
                library : {
                    name : "name2"
                }
            },
            id:12
        })
        const state = linksReducer(initialState, action)
        const newState = {
            isLoading: true,
            error: null,
            links: []
        }
        expect(state).toEqual(newState)
    })
    //creer un nouveau initialState pour avoir un link a update sinon le deducer ne peut pas fonctionner ...
    const initialState2 = {
        isLoading : false,
        error: null,
        links: [{libraryId:12,user:{id:12,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"name"}] 
    }

    it('Update Link success', ()=> {
        const action = linksActions.linksActions.updateLinkSuccess({link:{libraryId:12,user:{id:12,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"name2"}})
        const state = linksReducer(initialState2, action)
        const newState = {
            isLoading: false,
            error: null,
            links: [{libraryId:12,user:{id:12,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"name2"}]
        }
        expect(state).toEqual(newState)
    })
    it('Update Link failure', ()=> {
        const action = linksActions.linksActions.updateLinkFailure()
        const state = linksReducer(initialState2, action)
        const newState = {
            isLoading: false,
            error: null,
            links: [{libraryId:12,user:{id:12,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"name"}]
        }
        expect(state).toEqual(newState)
    })
    it('Delete Link', ()=> {
        const action = linksActions.linksActions.deleteLink({id:12})
        const state = linksReducer(initialState2, action)
        const newState = {
            isLoading: true,
            error: null,
            links: [{libraryId:12,user:{id:12,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"name"}]
        }
        expect(state).toEqual(newState)
    })
    it('Delete Link success', ()=> {
        const action = linksActions.linksActions.deleteLinkSuccess({link:{libraryId:12,user:{id:12,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"name2"}})
        const state = linksReducer(initialState2, action)
        const newState = {
            isLoading: false,
            error: null,
            links: []
        }
        expect(state).toEqual(newState)
    })
    it('Delete Link failure', ()=> {
        const action = linksActions.linksActions.deleteLinkFailure()
        const state = linksReducer(initialState2, action)
        const newState = {
            isLoading: false,
            error: null,
            links: [{libraryId:12,user:{id:12,username:'user',email:'email',password:'password',userRole:'user',enabled:true,accountNonExpired:true,accountNonLocked:true,credentialsNonExpired:true},libraryName:"name"}]
        }
        expect(state).toEqual(newState)
    })

    
})