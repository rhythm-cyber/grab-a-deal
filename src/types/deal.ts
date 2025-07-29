export interface Deal {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  productUrl: string;
  affiliateUrl?: string;
  platform: Platform;
  imageUrl?: string;
  rating?: number;
  reviews?: number;
  category?: string;
  isUnlocked?: boolean;
  createdAt: string;
}

export type Platform = 'flipkart' | 'amazon' | 'jiomart' | 'myntra' | 'swiggy' | 'bigbasket';

export interface PlatformConfig {
  name: string;
  color: string;
  icon: string;
  baseUrl: string;
}

export interface PaymentData {
  orderId: string;
  amount: number;
  currency: string;
  dealId: string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}