import { HeaderNavigationConfig } from "@/types";

export const headerNavigationConfig: HeaderNavigationConfig = {
  navigation: [
    {
      logo: {
        href: "/",
        text: "Lexara",
      },
      links: [
        {
          href: "/dashboard",
          text: "dashboard",
        },
        {
          href: "#pricing",
          text: "pricing",
        },
        {
          href: "/about",
          text: "about",
        },
      ],
    },
  ],
};
