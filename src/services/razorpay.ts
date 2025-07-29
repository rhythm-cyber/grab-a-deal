import { RazorpayResponse, PaymentData } from '@/types/deal';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export class RazorpayService {
  private static RAZORPAY_KEY = 'rzp_test_your_key_here'; // Replace with your actual key

  static loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  static async processPayment(
    paymentData: PaymentData,
    onSuccess: (response: RazorpayResponse) => void,
    onFailure: (error: any) => void
  ): Promise<void> {
    const isLoaded = await this.loadRazorpayScript();
    
    if (!isLoaded) {
      onFailure(new Error('Failed to load Razorpay script'));
      return;
    }

    const options = {
      key: this.RAZORPAY_KEY,
      amount: paymentData.amount, // Amount in paisa
      currency: paymentData.currency,
      name: 'Deal Aggregator',
      description: 'Unlock affiliate link for ₹0.89',
      order_id: paymentData.orderId,
      handler: (response: RazorpayResponse) => {
        onSuccess(response);
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#8B5CF6',
      },
      modal: {
        ondismiss: () => {
          onFailure(new Error('Payment cancelled by user'));
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  static generateAffiliateUrl(platform: string, originalUrl: string): string {
    const affiliateIds = {
      flipkart: 'AFFILIATE_FLIPKART',
      amazon: 'AFFILIATE_AMAZON',
      jiomart: 'AFFILIATE_JIOMART',
      myntra: 'AFFILIATE_MYNTRA',
      bigbasket: 'AFFILIATE_BIGBASKET',
      swiggy: 'AFFILIATE_SWIGGY',
    };

    switch (platform) {
      case 'flipkart':
        const flipkartPath = new URL(originalUrl).pathname;
        return `https://dl.flipkart.com/dl${flipkartPath}?affid=${affiliateIds.flipkart}`;
      
      case 'amazon':
        const asin = this.extractASINFromAmazonUrl(originalUrl);
        return `https://www.amazon.in/dp/${asin}?tag=${affiliateIds.amazon}`;
      
      case 'jiomart':
        const jiomartPath = new URL(originalUrl).pathname;
        return `https://www.jiomart.com${jiomartPath}?affid=${affiliateIds.jiomart}`;
      
      case 'myntra':
        return `https://myntra.go2cloud.org/aff_c?offer_id=6&aff_id=${affiliateIds.myntra}&url=${encodeURIComponent(originalUrl)}`;
      
      case 'bigbasket':
        const bigbasketPath = new URL(originalUrl).pathname;
        return `https://www.bigbasket.com${bigbasketPath}?affiliate=${affiliateIds.bigbasket}`;
      
      case 'swiggy':
        return `https://cuelinks.com/redirect?url=${encodeURIComponent(originalUrl)}&aff_id=${affiliateIds.swiggy}`;
      
      default:
        return originalUrl;
    }
  }

  private static extractASINFromAmazonUrl(url: string): string {
    const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
    return asinMatch ? asinMatch[1] : 'B0DUMMY123';
  }
}