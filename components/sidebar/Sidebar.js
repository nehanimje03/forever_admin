"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../public/logo.png";

import {
  PlusSquare,
  List,
  ShoppingCart,
  LogOut,
  UserCircle2,
  ChevronsUpDown,
  Settings,
  Bell,
  User,
} from "lucide-react";

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
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthStore } from "../../zustand/useAuthStore";
import { toast } from "react-toastify";
import LogoutModel from "./LogoutModel";

const items = [
  {
    title: "Add Items",
    url: "/addProduct",
    icon: PlusSquare,
  },
  {
    title: "List Items",
    url: "/productsList",
    icon: List,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCart,
  },
];

const AdminSidebar = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    setOpen(false);
    router.push("/");
  };

  return (
    <>
      <TooltipProvider>
        <SidebarProvider>
          <Sidebar
            collapsible="icon"
            className="border-r"
          >
            {/* HEADER */}
            <SidebarHeader className="border-b">
              <div className="flex items-center px-3 ">
                <div className="overflow-hidden group-data-[collapsible=icon]:hidden">
                  <Image
                    src={logo}
                    alt="logo"
                    className="object-contain w-28"
                    priority
                  />
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.url}
                          tooltip={item.title}
                          className="h-11 rounded-xl px-3"
                        >
                          <Link
                            href={item.url}
                            className="flex items-center gap-3"
                          >
                            <item.icon className="h-5 w-5 shrink-0" />

                            <span className="group-data-[collapsible=icon]:hidden">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t">
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="h-14 rounded-xl data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <UserCircle2 className="h-5 w-5" />
                        </div>

                        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                          <span className="truncate font-semibold">
                            {user?.name || "Admin"}
                          </span>

                          <span className="truncate text-xs text-muted-foreground">
                            {user?.email || "admin@gmail.com"}
                          </span>
                        </div>

                        <ChevronsUpDown className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-64 rounded-xl"
                      side="right"
                      align="end"
                      sideOffset={8}
                    >
                      <div className="flex items-center gap-3 border-b p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <UserCircle2 className="h-5 w-5" />
                        </div>

                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {user?.name || "Admin"}
                          </span>

                          <span className="text-xs text-muted-foreground">
                            {user?.email || "admin@gmail.com"}
                          </span>
                        </div>
                      </div>

                      <div className="p-1">
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();

                            setOpen(true);
                          }}
                          className="cursor-pointer rounded-lg text-red-500 focus:text-red-500"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="bg-muted/30">
            <header className="flex h-16 items-center border-b bg-background px-4">
              <SidebarTrigger />
            </header>

            <div className="p-6">
              <div className="min-h-[calc(100vh-120px)] rounded-2xl border bg-background p-6 shadow-sm">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>

      <LogoutModel
        open={open}
        setOpen={setOpen}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default AdminSidebar;
