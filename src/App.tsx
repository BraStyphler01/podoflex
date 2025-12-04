import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandSettingsProvider } from "@/contexts/BrandSettingsContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import PodoflexLanding from "./pages/PodoflexLanding";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrandSettingsProvider>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PodoflexLanding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </BrandSettingsProvider>
);

export default App;