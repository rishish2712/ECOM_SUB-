import type { NextAuthConfig } from 'next-auth'

export default{
    providers:[],
    callbacks:{
        authorized({ requirest, auth}:any){
            const protectedPaths=[
                /\/checkout(\/.*)?/,
                /\/account(\/.*)?/,
                /\/admin(\/.*)?/,
            ]
            const { pathname } = requirest.nextrUrl
            if( protectedPaths.some((p) => p.test(pathname))) return !!auth
            return true
        },
    },
}satisfies NextAuthConfig