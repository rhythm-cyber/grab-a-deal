import { Deal, Platform, PaymentData } from '@/types/deal';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.render.com' 
  : 'http://localhost:8000';

export class ApiService {
  static async fetchDeals(platform?: Platform): Promise<Deal[]> {
    try {
      // For now, return empty array since we need a real Amazon API integration
      // This will require a backend service to scrape Amazon deals due to CORS restrictions
      console.log('Amazon deals fetching not yet implemented - requires backend API');
      return [];
    } catch (error) {
      console.error('Error fetching deals:', error);
      return [];
    }
  }

  static async createPaymentOrder(dealId: string): Promise<PaymentData> {
    try {
      const response = await fetch(`${API_BASE_URL}/create_order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 89, // ₹0.89 in paisa
          currency: 'INR',
          deal_id: dealId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment order:', error);
      // Return mock order for development
      return {
        orderId: 'order_mock_' + Date.now(),
        amount: 89,
        currency: 'INR',
        dealId,
      };
    }
  }

  static async verifyPayment(paymentData: any): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/verify_payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      return response.ok;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  }

  private static getMockDeals(platform?: Platform): Deal[] {
    const mockDeals: Deal[] = [
      {
        id: '1',
        title: 'Samsung Galaxy M32 (Ice Blue, 128 GB)',
        price: 14999,
        originalPrice: 19999,
        discount: 25,
        productUrl: 'https://flipkart.com/samsung-galaxy-m32',
        platform: 'flipkart',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
        rating: 4.2,
        reviews: 1523,
        category: 'Electronics',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Apple iPhone 13 (Blue, 128 GB)',
        price: 59900,
        originalPrice: 69900,
        discount: 14,
        productUrl: 'https://amazon.in/apple-iphone-13',
        platform: 'amazon',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
        rating: 4.5,
        reviews: 2341,
        category: 'Electronics',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Fresh Organic Bananas (1 kg)',
        price: 89,
        originalPrice: 120,
        discount: 26,
        productUrl: 'https://jiomart.com/bananas',
        platform: 'jiomart',
        imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop',
        rating: 4.0,
        reviews: 234,
        category: 'Groceries',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Roadster Cotton Casual Shirt',
        price: 899,
        originalPrice: 1599,
        discount: 44,
        productUrl: 'https://myntra.com/roadster-shirt',
        platform: 'myntra',
        imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=300&fit=crop',
        rating: 4.1,
        reviews: 867,
        category: 'Fashion',
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Pizza Margherita (Regular)',
        price: 199,
        originalPrice: 299,
        discount: 33,
        productUrl: 'https://swiggy.com/pizza',
        platform: 'swiggy',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
        rating: 4.3,
        reviews: 456,
        category: 'Food',
        createdAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Fresho Tomatoes (1 kg)',
        price: 45,
        originalPrice: 60,
        discount: 25,
        productUrl: 'https://bigbasket.com/tomatoes',
        platform: 'bigbasket',
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop',
        rating: 4.2,
        reviews: 123,
        category: 'Groceries',
        createdAt: new Date().toISOString(),
      },
    ];

    return platform ? mockDeals.filter(deal => deal.platform === platform) : mockDeals;
  }
}