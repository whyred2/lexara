export type HeaderNavigationConfig = {
  navigation: HeaderNavigation[];
};

export type HeaderNavigation = {
  logo: {
    href: string;
    text: string;
  };
  links: NavigationItem[];
};

export type NavigationItem = {
  href: string;
  text: string;
};

/* ------------------------------------------ */

export type PricingConfig = {
  plans: PricingPlan[];
};

export type PricingPlan = {
  title: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  features: string[];
  highlight: boolean;
};
