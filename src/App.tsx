import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { IdentityModal } from "./IdentityModal";
import { defaultIdentity } from "./IdentityData";

const queryClient = new QueryClient();

const App = () => {
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [meIdentity, setMeIdentity] = useState(defaultIdentity);
  const [partnerIdentity, setPartnerIdentity] = useState(defaultIdentity);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  setIsIdentityModalOpen={setIsIdentityModalOpen}
                  meIdentity={meIdentity}
                  partnerIdentity={partnerIdentity}
                />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        <IdentityModal
          isOpen={isIdentityModalOpen}
          onClose={() => setIsIdentityModalOpen(false)}
          meIdentity={meIdentity}
          setMeIdentity={setMeIdentity}
          partnerIdentity={partnerIdentity}
          setPartnerIdentity={setPartnerIdentity}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
