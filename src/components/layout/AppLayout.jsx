import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { AppSidebar } from "@/components/layout/AppSidebar.jsx";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ChartColumnIncreasing, Plane, Route as Planner } from "lucide-react";
import { AccountOptions } from "../common/AccountOptions";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/features/user/user.service";
import { Toaster } from "../ui/sonner";
import { ScrollRestoration } from "../common/ScrollRestoration";
import { MobileBottomNav } from "../common/MobileBottomNav";

export default function AppLayout() {
  const navItems = [
    {
      title: "Dashboard",
      description: "Overview & Analytics",
      url: "/",
      icon: ChartColumnIncreasing,
    },
    {
      title: "Trip Planner",
      description: "Plan your nect adventure",
      url: "/trips/create",
      icon: Plane,
    },
    {
      title: "My Trips",
      description: "View all trips",
      url: "/trips",
      icon: Planner,
    },
  ];

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserDetails(),
    staleTime: 10000,
  });

  return (
    <SidebarProvider>
      <ScrollRestoration />
      <div className="flex flex-col min-h-screen w-full bg-card">
        {/* [ A ] Header-Top */}
        <header className="sticky top-0 z-50 bg-transparent backdrop-blur-3xl w-full max-w-[1600px] mx-auto flex justify-between h-16 items-center gap-2 border-b px-10 max-[920px]:px-4">
          {/* 1 ] HEADING*/}
          <Link className="flex gap-2 items-center">
            <Planner className="gradient-btn box-content p-2 rounded-2xl" />
            <div className="max-[920px]:">
              <h4 className="text-lg font-medium gradient-text">
                Journey Craft 
              </h4>
              <p className="text-xs font-medium">Smart Travel Planning</p>
            </div>
          </Link>

          {/* 2 ]  NAVLINKS*/}
          <div className="flex items-center gap-5 max-[920px]:hidden">
            <SidebarTrigger />
            <div className="flex items-center gap-2 ">
              {navItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  end={item.url === "/trips"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded-md ${isActive ? "text-white gradient-btn" : "text-sidebar-item-text hover:text-secondary-foreground hover:bg-muted"}`
                  }
                >
                  <item.icon size={20} />
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* 3 ] AVTAR*/}
          <AccountOptions>
            <button className="flex items-center gap-2 hover:bg-muted px-2 py-1 rounded-md">
              <Avatar>
                <AvatarImage
                  src={`${user?.user?.avtar || "https://github.com/shadcn.png"} `}
                />
                <AvatarFallback>CN</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>

              <div className="text-left max-[920px]:hidden">
                <h3 className="text-sm">{user?.user?.name}</h3>
                <p className="text-xs text-muted-foreground">Standard Plan</p>
              </div>
            </button>
          </AccountOptions>
        </header>

        {/* [ B ] Sidebar & Main - Bottom */}
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <main className="p-6 max-md:pb-24 max-sm:px-3 w-full max-w-[1095px] mx-auto">
              <Outlet />
              <Toaster />
            </main>
          </SidebarInset>
        </div>
      </div>

      {/* [ C ] Mobile Navbar */}
      <MobileBottomNav />
    </SidebarProvider>
  );
}
