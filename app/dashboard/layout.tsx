interface DashboardProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardProps) {
  return <div className="min-h-screen">{children}</div>;
}
