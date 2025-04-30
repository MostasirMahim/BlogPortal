"use client";

import type React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { databaseUser } from "@/components/navbar/NavbarPage";
import ModeToggle from "@/components/navbar/ModeToggle";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  Clock,
  Settings,
  LogOut,
  Menu,
  Bell,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getUserFromDB } from "@/actions/user.action";
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
}

const NavItem = ({ icon, label, href, active, badge }: NavItemProps) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
      active ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
    }`}
  >
    {icon}
    <span>{label}</span>
    {badge !== undefined && (
      <span className="ml-auto bg-primary/20 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </Link>
);

function AdminDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: USER, isLoading } = useQuery<databaseUser | null>({
    queryKey: ["adminData"],
    queryFn: async () => await getUserFromDB(),
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navigation = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/admin",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Users",
      href: "/admin/users",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Posts",
      href: "/admin/posts",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Pending Posts",
      href: "/admin/pending-posts",
      badge: 5,
    },
    {
      icon: <FolderOpen className="h-5 w-5" />,
      label: "Categories",
      href: "/admin/categories",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/admin/settings",
    },
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Link href="/admin" className="flex items-center gap-2 mb-6">
          <div className="bg-primary text-primary-foreground p-1 rounded">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl">Admin Panel</span>
        </Link>

        <div className="mb-4">
          <Input placeholder="Search..." className="bg-muted" />
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
              badge={item.badge}
            />
          ))}
        </nav>
      </ScrollArea>

      <Separator className="my-4" />

      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={USER?.avatar || "/user.png"} alt={USER?.name} />
            <AvatarFallback>{USER?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{USER?.name}</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="flex w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Link href="/" className="flex w-full">
                  <LogOut className="h-4 w-4 mr-2" /> User View
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button variant="outline" size="sm" className="w-full gap-1">
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r bg-background h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <ModeToggle />

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={USER?.avatar || "/user.png"}
                      alt={USER?.name}
                    />
                    <AvatarFallback>{USER?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={`/profile/${USER?.username}`}
                    className="flex w-full"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Link href="/" className="flex w-full">
                    <LogOut className="h-4 w-4 mr-2" /> User View
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
