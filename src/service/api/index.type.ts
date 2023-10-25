export type StripeSessionData = {
  businessSlug: string;
  tipValue: number;
  productName: string;
  productDescription: string;
  successUrl: string;
  businessOrderingId: number;
};

export type Business = {
  orderingId: number;
  name: string;
  slug: string;
  logo: string;
};
