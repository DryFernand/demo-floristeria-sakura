export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
  icon?: string;
  popular?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  badge?: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  text: string;
  stars: number;
}

export interface SocialProof {
  rating: number;
  reviewsCount: number;
  testimonials: Testimonial[];
}

export interface LocationConfig {
  address: string;
  lat: number;
  lng: number;
  wazeUrl?: string;
  googleMapsUrl?: string;
  schedule?: string;
}

export interface FeaturesConfig {
  showQuoter: boolean;
  showCatalog: boolean;
}

export interface SiteConfig {
  businessName: string;
  tagline: string;
  industry: string;
  phone: string;
  whatsappMessage: string;
  currency: string;
  features: FeaturesConfig;
  services: ServiceItem[];
  products: ProductItem[];
  socialProof: SocialProof;
  location: LocationConfig;
}
