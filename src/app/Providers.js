"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "@/components/ui/sidebar";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        {children}

        <ToastContainer
          position="top-right"
          autoClose={3000}
        />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
