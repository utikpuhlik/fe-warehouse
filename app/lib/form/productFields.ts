export const productFields = [
    { name: 'name', label: 'Product name', type: 'text', variant: 'name' },
    { name: 'quantity', label: 'Available quantity', type: 'number', variant: 'quantity' },
    { name: 'manufacturer_number', label: 'Manufacturer No.', type: 'text', variant: 'manufacturer' },
    { name: 'cross_number', label: 'Cross Ref No.', type: 'text', variant: 'cross' },
    { name: 'description', label: 'Short description', type: 'text', variant: 'description' },
    { name: 'price', label: 'Price in RUB', type: 'number', variant: 'price' },
    { name: 'super_wholesale_price_rub', label: 'Super wholesale price', type: 'text', variant: 'price' },
    { name: 'image_url', label: 'Image URL', type: 'text', variant: 'image' },
] as const;

