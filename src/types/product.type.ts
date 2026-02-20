import { ProductUseType } from "./productUse.type"
import { SubCategoryType } from "./subcategory.type"


export type ProductType = {
    _id: string
    name: {
        en: string,
        ar: string,
        ru: string,
        fa: string
    },
    description: {
        en: string,
        ar: string,
        ru: string,
        fa: string
    },
    thumb: string,
    color: string,
    images: string[],
    gallery: string[],
    subcategory: SubCategoryType,
    use: ProductUseType[]
    characteristics: ProductUseType[]
    packaging: {
        palletSize: string,
        palletWight: string,
        palletCount: string,
        cartonSize: string,
        cartonWight: string,
        cartonCount: string,
        cartonInPalletCount: string,
        press: string,
        size: string,
        width: string,
    }
    size: {
        width: string, cm: string, inch: string
    },
    isPublic: boolean;
}


export type ProductApi = {
    success:boolean,
    data:ProductType
}