import {z} from 'zod'

import { UserSignInSchema,UserInputSchema } from "@/lib/validator";

export type IProductInput = z.infer<typeof ProductInputSchema>

export type Dta = {
    product: IProductInput[]
    headerMenus:{
        name: string
        herf: string
    }[]
    carousels: {
        image: string
        url: string
        title: string
        buttonCaption: string
        isPublished: boolean
    }[]
}




export type OrderItem = z.infer<typesof OrderItemSchema>
export type Cart = z.infer<typeof CartSchema>



//USER
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>