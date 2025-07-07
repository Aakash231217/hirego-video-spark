
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PlatformHeader } from "@/components/PlatformHeader";
import { PlatformSidebar } from "@/components/PlatformSidebar";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <PlatformSidebar />
            <div className="flex-1 flex flex-col">
              <PlatformHeader />
              <main className="flex-1 p-6 bg-gray-50/50">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/messages" element={<div className="text-center py-20 text-muted-foreground">Messages page coming soon</div>} />
                  <Route path="/calendar" element={<div className="text-center py-20 text-muted-foreground">Calendar page coming soon</div>} />
                  <Route path="/documents" element={<div className="text-center py-20 text-muted-foreground">Documents page coming soon</div>} />
                  <Route path="/automation" element={<div className="text-center py-20 text-muted-foreground">Automation page coming soon</div>} />
                  <Route path="/settings" element={<div className="text-center py-20 text-muted-foreground">Settings page coming soon</div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
