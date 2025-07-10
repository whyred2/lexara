import { Header } from "@/components/header";

import { headerNavigationConfig } from "@/config/header-nav";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header items={headerNavigationConfig.navigation} />
      {children}
    </div>
  );
}
