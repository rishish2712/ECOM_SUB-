'use server'

import { connectToDatabase } from "../db";
import Product, { IProduct } from '@/lib/db/models/product.model'

export async function getAllCategories() {
    await connectToDatabase();
    const categories = await Product.find({isPublished : true}).distinct('category');
    return categories;
}

export async function getProductBySlug(slug : string) {
    await connectToDatabase();
    const product = await Product.findOne({slug, isPublished : true})
    if(!product) throw new Error('Product not found');
    return JSON.parse(JSON.stringify(product)) as IProduct;
}

// export async function getProductsByCategory({
//     category,
//     productId,
// })