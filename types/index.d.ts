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
