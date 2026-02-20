import { CategoryType } from "./category.type"


export type SubCategoryType = {
    _id: string
    name: {
        en: string,
        ar: string,
        ru: string,
        fa: string
    },
    size: string,
    description: {
        en: string,
        ar: string,
        ru: string,
        fa: string
    },
    image: string,
    alt: string,
    priority: string,
    category: CategoryType
}
