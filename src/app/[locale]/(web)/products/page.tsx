import { apiUrl, imageBaseUrl } from "@/configs/config";
import Link from "next/link";

type ProductPagePropsType = {
  params: { locale: "fa" | "en" | "ar" | "ru" };
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function getProducts(query?: string) {
  try {
    const res = await fetch(
      `${apiUrl}products${query ? `?subcategory=${query}` : ""}`,
      {
        next: { revalidate: 0 }, // no cache
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export default async function ProductPage({
  params: { locale },
  searchParams,
}: ProductPagePropsType) {
  const subCategory = searchParams?.subcategory;

  const productsResponse = await getProducts(
    typeof subCategory === "string" ? subCategory : undefined
  );

    const products = productsResponse.data
  console.log("productsResponse:",productsResponse);
  

  return (
    <div className="md:pt-45 px-8 md:px-16 max-w-350 mx-auto">
      <div className="text-center md:text-start">
        <h1 className="text-xl text-black font-semibold md:text-3xl mb-6 md:mb-10 inline-block relative after:absolute after:left-0 after:-bottom-2.5 after:h-0.75 after:rounded-xl after:bg-primary after:w-full">
          محصولات
        </h1>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-15">
            {products?.map((product, index) => (

            <Link key={`product-${index}`} href={`products/${product._id}`} className="flex flex-col items-center gap-2 overflow-hidden">
              <img src={`${imageBaseUrl}/${product.thumb}`} alt="ax" />
              <p className="text-xl font-bold">{product.name[locale]}</p>
              <p>2.5 * 2.5</p>

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}