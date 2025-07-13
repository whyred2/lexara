import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { headerNavigationConfig } from "@/config/header-nav";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header items={headerNavigationConfig.navigation} />
      {children}
      <Footer />
    </div>
  );
}
