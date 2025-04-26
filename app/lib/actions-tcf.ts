'use server';

import {z} from 'zod';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

const ProductSchemaForm = z.object({
    address_id: z.string(),
    name: z.string(),
    brand: z.string(),

    manufacturer_number: z.string(),
    cross_number: z.string(),
    description: z.string(),
    image_url: z.string(),

    price_rub: z.number().positive(),
    super_wholesale_price_rub: z.number(),
    quantity: z.number()
});

const CreateProduct = ProductSchemaForm;

export async function createProduct(formData: FormData) {
    const {
        address_id,
        name,
        brand,
        manufacturer_number,
        cross_number,
        description,
        image_url,
        price_rub,
        super_wholesale_price_rub,
        quantity
    } = CreateProduct.parse({
        address_id: formData.get('address_id')


    });


    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}