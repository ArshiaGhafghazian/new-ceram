import ProductPage from "@/components/pages/product";
import { apiUrl } from "@/configs/config";
import { ProductApi } from "@/types/product.type";
import React from "react";

type ProductSinglePagePropsType = {
  params: Promise<{ slug: string; locale: "fa" | "en" | "ar" | "ru" }>;
};

async function getProduct(query: string): Promise<ProductApi | null> {
  try {
    const res = await fetch(`${apiUrl}products/${query}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return null; // Return null in case of an error
  }
}

const ProductSinglePage: React.FC<ProductSinglePagePropsType> = async ({
  params,
}) => {
  const { slug, locale } = await params;

  const product = await getProduct(slug);
  if (!product) {
    return "حطایی رخ داده است";
  }
  return <ProductPage data={product.data} locale={locale} />;
};

export default ProductSinglePage;
