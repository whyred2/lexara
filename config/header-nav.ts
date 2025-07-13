import { HeaderNavigationConfig } from "@/types";

export const headerNavigationConfig: HeaderNavigationConfig = {
  navigation: [
    {
      logo: {
        href: "/",
        text: "Nexara",
      },
      links: [
        {
          href: "/dashboard",
          text: "Dashboard",
        },
        {
          href: "/pricing",
          text: "Pricing",
        },
        {
          href: "/about",
          text: "About",
        },
      ],
    },
  ],
};
