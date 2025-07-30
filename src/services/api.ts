import { Deal, Platform, PaymentData } from '@/types/deal';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.render.com' 
  : 'http://localhost:8000';

export class ApiService {
  static async fetchDeals(platform?: Platform): Promise<Deal[]> {
    try {
      // Return Amazon deals with affiliate links
      return this.getMockAmazonDeals();
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

  private static getMockAmazonDeals(): Deal[] {
    const amazonDeals: Deal[] = [
      {
        id: '1',
        title: 'Apple iPhone 15 (128GB, Blue)',
        price: 65999,
        originalPrice: 79900,
        discount: 17,
        productUrl: 'https://www.amazon.in/dp/B0CHX1W1XY?tag=deals8904-21',
        platform: 'amazon',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
        rating: 4.5,
        reviews: 2341,
        category: 'Electronics',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Samsung 43" 4K Smart TV',
        price: 32999,
        originalPrice: 54999,
        discount: 40,
        productUrl: 'https://www.amazon.in/dp/B08W8VR8YZ?tag=deals8904-21',
        platform: 'amazon',
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
        rating: 4.3,
        reviews: 1892,
        category: 'Electronics',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Sony WH-1000XM4 Wireless Headphones',
        price: 19990,
        originalPrice: 29990,
        discount: 33,
        productUrl: 'https://www.amazon.in/dp/B0863TXGM3?tag=deals8904-21',
        platform: 'amazon',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        rating: 4.6,
        reviews: 3241,
        category: 'Electronics',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
        price: 6999,
        originalPrice: 12995,
        discount: 46,
        productUrl: 'https://www.amazon.in/dp/B00FLYWNYQ?tag=deals8904-21',
        platform: 'amazon',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
        rating: 4.4,
        reviews: 1567,
        category: 'Home & Kitchen',
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Nike Air Max 270 Sneakers',
        price: 7495,
        originalPrice: 12995,
        discount: 42,
        productUrl: 'https://www.amazon.in/dp/B07H9Z4Z2K?tag=deals8904-21',
        platform: 'amazon',
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
        rating: 4.2,
        reviews: 892,
        category: 'Fashion',
        createdAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Kindle Paperwhite (11th Gen)',
        price: 9999,
        originalPrice: 14999,
        discount: 33,
        productUrl: 'https://www.amazon.in/dp/B08N41Y4Q2?tag=deals8904-21',
        platform: 'amazon',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
        rating: 4.5,
        reviews: 2134,
        category: 'Books',
        createdAt: new Date().toISOString(),
      },
      {
        id: '7',
        title: 'Boat Airdopes 441 TWS Earbuds',
        price: 1499,
        originalPrice: 2990,
        discount: 50,
        productUrl: 'https://www.amazon.in/dp/B08R6VD7PY?tag=deals8904-21',
        platform: 'amazon',
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
        rating: 4.1,
        reviews: 1234,
        category: 'Electronics',
        createdAt: new Date().toISOString(),
      },
      {
        id: '8',
        title: 'Fire TV Stick 4K Max',
        price: 3499,
        originalPrice: 6999,
        discount: 50,
        productUrl: 'https://www.amazon.in/dp/B08MQZXN1X?tag=deals8904-21',
        platform: 'amazon',
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
        rating: 4.4,
        reviews: 2567,
        category: 'Electronics',
        createdAt: new Date().toISOString(),
      }
    ];

    return amazonDeals;
  }
}