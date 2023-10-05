import { IProductWithPrice } from "@/types/Product.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";

const getActiveProductsWithPrices = async (): Promise<IProductWithPrice[]> => {
  const supabase = createServerComponentClient<Database>({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });
  if (error) {
    console.log(error);
  }

  return (data as IProductWithPrice[]) || [];
};

export default getActiveProductsWithPrices;
