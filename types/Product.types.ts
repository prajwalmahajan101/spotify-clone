import Stripe from "stripe";
import { IPrice } from "@/types/Price.types";

export interface IProduct {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface IProductWithPrice extends IProduct {
  prices?: IPrice[];
}
