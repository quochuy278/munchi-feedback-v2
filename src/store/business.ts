import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialBusiness {
  slug: string;
  orderingId: number;
  name: string;
  logo: string;
  setBusiness: (
    orderingId: number,
    slug: string,
    name: string,
    logo: string
  ) => void;
}

const useBusinessStore = create<InitialBusiness>()(
  persist(
    (set) => ({
      orderingId: 0,
      slug: "",
      logo: "",
      name: "",
      setBusiness: (
        orderingId: number,
        slug: string,
        name: string,
        logo: string
      ) => {
        set({
          orderingId: orderingId,
          slug: slug,
          name: name,
          logo: logo,
        });
      },
    }),
    {
      name: "business",
    }
  )
);

export { useBusinessStore };
