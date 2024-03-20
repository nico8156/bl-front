export interface LinksResponseInterface{
    libraryId: number
    user: {
        id: number
        username: string
        email: string
        password: string
        userRole: string
        enabled: boolean
        accountNonExpired: boolean
        accountNonLocked: boolean
        authorities?: [
            {
                authority: string
            }
        ],
        credentialsNonExpired: boolean 
    },
    libraryName: string
}
