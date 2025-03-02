<<<<<<< HEAD
export type IProductInput = z.infer<typeof ProductInputSchema>
import { ProductInputSchema } from '@/lib/validator'
import { z } from 'zod'

export type IProductInput = z.infer<typeof ProductInputSchema>
export type Data = {
  products: IProductInput[]
  headerMenus: {
    name: string
    href: string
  }[]
  carousels: {
    image: string
    url: string
    title: string
    buttonCaption: string
    isPublished: boolean
  }[]
}
=======
import {z} from 'zod'

import { ProductInputSchema, ReviewInputSchema, UserSignInSchema, UserInputSchema, OrderItemSchema, CartSchema } from "@/lib/validator";

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



// ORDER AND CART
export type OrderItem = z.infer<typeof OrderItemSchema>
export type Cart = z.infer<typeof CartSchema>



//USER
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
>>>>>>> 1b8421a75b224080cbc3a933efbc03d7d63630e9
