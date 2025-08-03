// src/lib/config.ts (or lib/config.ts)

// Define interfaces for type safety
interface ExternalLinks {
    PHONE: string;
    CONTACT_EMAIL: string;
    INSTAGRAM: string;
    TIKTOK: string;
    ADDRESS?: string;
}

interface GoogleDocForm {
    FORM_URL: string;
}

interface ApiEndpoints {
    PRODUCTS: string;
    CART: string;
    ORDERS: string;
    CREATE_PAYMENT: string;
    PAYMENT_RESPONSE: string;
}

interface RedsysRedirectUrls {
    SUCCESS: string;
    FAILURE: string;
}

// Base API URL from environment variables
const API_BASE_URL: string =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// External links (e.g., Google Form, social media)
export const EXTERNAL_LINKS: ExternalLinks = {
    PHONE: '(+34) 640 614 989',
    CONTACT_EMAIL: 'totalkeepersbilbao@gmail.com',
    INSTAGRAM: 'https://www.instagram.com/totalkeepersbilbao/',
    TIKTOK: 'https://www.tiktok.com/@Totalkeepersbilbao',
    ADDRESS: 'Mallona Zeharkalea, Ibaiondo, 48006 Bilbao, Bizkaia, Spain',

};

// FastAPI endpoints for shop functionality
export const API_ENDPOINTS: ApiEndpoints = {
  PRODUCTS: `${API_BASE_URL}/api/v1/products`,
  CART: `${API_BASE_URL}/api/v1/cart`,
  ORDERS: `${API_BASE_URL}/api/v1/orders`,
  CREATE_PAYMENT: `${API_BASE_URL}/api/v1/create-payment`,
  PAYMENT_RESPONSE: `${API_BASE_URL}/api/v1/payment-response`,
};

// Redsys redirect URLs for payment success/failure
export const REDSYS_REDIRECT_URLS: RedsysRedirectUrls = {
  SUCCESS: '/payment/success',
  FAILURE: '/payment/failure',
};

export const GOOGLE_DOC_FORM: GoogleDocForm = {
    FORM_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSe6TAPQdytn1BS8NoaVHa_df5rUNTEbY11oPrxNxRrr37d0tQ/viewform'
};