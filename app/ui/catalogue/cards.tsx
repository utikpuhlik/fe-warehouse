import Image from 'next/image';
import Link from "next/link";
import {Product} from "@/app/lib/schemas-tcf";

export function CategoryCard({title, image_url, slug}: {
    title: string;
    image_url: string;
    slug: string;
}) {
    if (!image_url) {
        image_url = 'https://chibisafe.eucalytics.uk//REXA2bZVWeZT.webp'
    }
    return (
        <div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
            <Link href={`/catalogue/${slug}`}>
            <div className="flex flex-col items-center p-4">
                <Image
                    src={image_url}
                    width={64}
                    height={64}
                    className="block"
                    alt={slug}
                />
                <h3 className="p-4 text-center text-sm font-medium">{title}</h3>
            </div>
            </Link>
        </div>
    );
}

export function SubCategoryCard({title, image_url, parentSlug, slug}: {
    title: string;
    image_url: string;
    parentSlug: string;
    slug: string;
}) {
    if (!image_url) {
        image_url = 'https://chibisafe.eucalytics.uk//REXA2bZVWeZT.webp'
    }
    return (
        <div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
            <Link href={`/catalogue/${parentSlug}/${slug}`}>
            <div className="flex flex-col items-center p-4">
                    <Image
                        src={image_url}
                        width={64}
                        height={64}
                        className="block"
                        alt={slug}
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
                            }: Product) {
    const fallbackImage = 'https://chibisafe.eucalytics.uk//REXA2bZVWeZT.webp';
    const imgSrc = image_url ?? fallbackImage;

    return (
        <div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
            <Link href={`/product/${id}`}>
                <div className="flex flex-col items-center p-4">
                    <Image
                        src={imgSrc}
                        width={100}
                        height={100}
                        alt={name}
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