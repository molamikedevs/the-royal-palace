import { ChildrenProps } from "@/types";
import SideNavigation from "@/components/navigation/SideNavigation";

export default function AccountLayout({ children }: ChildrenProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] min-h-[calc(100vh-5rem)]">
      <SideNavigation />
      <div className="py-6 px-4 sm:px-6 md:px-8 overflow-auto">{children}</div>
    </div>
  );
}
