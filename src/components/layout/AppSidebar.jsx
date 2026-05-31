import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ChartColumnIncreasing, Plane, Route as Planner } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export function AppSidebar() {
  const navigate = useNavigate();
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

  return (
    <Sidebar className="top-16 h-[calc(100%-3.5rem)]">
      <SidebarHeader className="py-5 px-4 md:hidden">
        <Link className="flex gap-3 items-center">
          <Planner className="gradient-btn box-content p-2 rounded-2xl" />
          <div>
            <h4 className="text-lg font-medium gradient-text">
              Journey Craft 
            </h4>
            <p className="text-xs font-medium">Smart Travel Planning</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator className="ml-0 md:hidden" />

      <SidebarContent className="pt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1.5">
                  <NavLink
                    to={item.url}
                    end={item.url === "/trips"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-4 rounded-md ${isActive ? "text-white gradient-btn" : "text-sidebar-item-text hover:text-secondary-foreground hover:bg-muted"}`
                    }
                  >
                    <item.icon size={20} />
                    <div>
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="text-[12px] font-medium ">
                        {item.description}
                      </p>
                    </div>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator className="m-0" />
        <Button
          className="gradient-btn py-5 gap-3 my-2 mb-3"
          onClick={() => navigate("/trips/create")}
        >
          <Plane size={24} />
          Plan New Trip
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
