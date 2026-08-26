import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LangProvider } from "@/contexts/LangContext";
import Index from "./pages/Index.tsx";
import LogXPost from "./pages/LogXPost.tsx";
import Projects from "./pages/Projects.tsx";
import NotFound from "./pages/NotFound.tsx";
import CommandPalette from "./components/CommandPalette.tsx";

const App = () => (
  <LangProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CommandPalette />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/logx/:slug" element={<LogXPost />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </LangProvider>
);

export default App;
