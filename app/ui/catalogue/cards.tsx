import Image from 'next/image';
import Link from "next/link";
import {Product} from "@/app/lib/schemas-tcf";
import {imageUrlPlaceholder} from "@/app/lib/schemas-tcf";

export function CategoryCard({title, image_url, category_slug}: {
    title: string;
    image_url: string;
    category_slug: string;
}) {
    return (
        <div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
            <Link href={`/catalogue/${category_slug}`}>
                <div className="flex flex-col items-center p-4">
                    <Image
                        src={image_url ?? imageUrlPlaceholder}
                        alt={category_slug}
                        width={64}
                        height={64}
                        className="block"
                    />
                    <h3 className="p-4 text-center text-sm font-medium">{title}</h3>
                </div>
            </Link>
        </div>
    );
}

export function SubCategoryCard({title, image_url, category_slug, sub_category_slug}: {
    title: string;
    image_url: string;
    category_slug: string;
    sub_category_slug: string;
}) {
    return (
        <div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
            <Link href={`/catalogue/${category_slug}/${sub_category_slug}`}>
                <div className="flex flex-col items-center p-4">
                    <Image
                        src={image_url ?? imageUrlPlaceholder}
                        alt={sub_category_slug}
                        width={64}
                        height={64}
                        className="block"
                    />
                    <h3 className="p-4 text-center text-sm font-medium">{title}</h3>
                </div>
            </Link>
        </div>
    );
}

export function ProductCard({
                                id,
                                name,
                                image_url,
                                price_rub,
                                brand,
                                manufacturer_number,
                                category_slug,
                                sub_category_slug
                            }: {
    id: string;
    name: string;
    image_url: string | null;
    price_rub: number;
    brand: string;
    manufacturer_number: string;
    category_slug: string;
    sub_category_slug: string;
}) {

    return (
        <div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
            <Link href={`/catalogue/${category_slug}/${sub_category_slug}/${id}`}>
                <div className="flex flex-col items-center p-4">
                    <Image
                        src={image_url ?? imageUrlPlaceholder}
                        alt={id}
                        width={100}
                        height={100}
                        className="object-contain mb-2"
                    />
                    <h3 className="text-center text-sm font-medium mb-1">{name}</h3>
                    <p className="text-xs text-gray-500">{brand}</p>
                    <p className="text-xs text-gray-400 mb-2">{manufacturer_number}</p>
                    <span className="text-sm font-semibold text-green-700">
            {Number(price_rub).toFixed(0)} ₽
          </span>
                </div>
            </Link>
        </div>
    );
}

export function ProductDetailCard({
                                      id,
                                      name,
                                      image_url,
                                      price_rub,
                                      brand,
                                      manufacturer_number,
                                      description,
                                  }: {
    id: string;
    name: string;
    image_url: string | null;
    price_rub: number;
    brand: string;
    manufacturer_number: string;
    description?: string | null;
}) {
    return (
        <div className="max-w-xl mx-auto rounded-2xl shadow-md bg-white p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                    <Image
                        src={image_url ?? imageUrlPlaceholder}
                        alt={name}
                        width={300}
                        height={300}
                        className="rounded-lg object-contain bg-gray-100"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 mb-2">{name}</h1>
                        <p className="text-gray-500 text-sm mb-4">
                            <span className="font-medium">Бренд:</span> {brand}<br />
                            <span className="font-medium">Производитель №:</span> {manufacturer_number}
                        </p>
                        {description && (
                            <p className="text-sm text-gray-600 mb-4">
                                {description}
                            </p>
                        )}
                    </div>

                    <p className="text-lg font-semibold text-green-700 mt-4">
                        {price_rub.toFixed(0)} ₽
                    </p>
                </div>
            </div>
        </div>
    );
}