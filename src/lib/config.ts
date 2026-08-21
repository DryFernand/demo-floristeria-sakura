import siteConfigRaw from "../../site.config.json";
import { SiteConfig } from "@/types/config";

export const siteConfig: SiteConfig = siteConfigRaw as SiteConfig;

export function formatCurrency(amount: number, currencySymbol: string = siteConfig.currency): string {
  return `${currencySymbol} ${amount.toLocaleString("es-DO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}
