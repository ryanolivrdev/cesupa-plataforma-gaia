import { type ReactNode } from "react";
import { SidebarProvider } from "./SidebarContext";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { Analytics } from "@vercel/analytics/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from '@mui/x-date-pickers/locales';
type AppProviderProps = {
  children: ReactNode;
};

import {  } from '@mui/x-date-pickers/AdapterDateFns';

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SidebarProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
        <DefaultSeo {...SEO} />
        {children}
        <Analytics />
      </LocalizationProvider>
    </SidebarProvider>
  );
}
