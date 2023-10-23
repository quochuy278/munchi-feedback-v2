import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialBusiness {
  slug: string;
  name: string;
  logo: string;
  setBusiness: (slug: string, name: string, logo: string) => void;
}

const useBusinessStore = create<InitialBusiness>()(
  persist(
    (set) => ({
      slug: "",
      logo: "",
      name: "",
      setBusiness: (slug: string, name: string, logo: string) => {
        set({
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
