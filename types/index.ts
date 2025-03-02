<<<<<<< HEAD
import {z} from 'zod'

import { ProductInputSchema, ReviewInputSchema, UserSignInSchema, UserInputSchema, OrderItemSchema, CartSchema } from "@/lib/validator";


export type IProductInput = z.infer<typeof ProductInputSchema>

export type Data = {
    users: IUserInput[]
    products: IProductInput[]
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

export type OrderItem = z.infer<typeof OrderItemSchema>
export type Cart = z.infer<typeof CartSchema>



//USER
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
=======
import {z} from 'zod'

import { ProductInputSchema, ReviewInputSchema, UserSignInSchema, UserInputSchema, OrderItemSchema, CartSchema } from "@/lib/validator";

export type IProductInput = z.infer<typeof ProductInputSchema>

export type Data = {
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



// ORDER AND CART
export type OrderItem = z.infer<typeof OrderItemSchema>
export type Cart = z.infer<typeof CartSchema>



//USER
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
>>>>>>> 9d50b3d42aeab2b1ed311efab915d2c8463b560f
