import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink } from 'lucide-react';
import { Deal, Platform } from '@/types/deal';
import { cn } from '@/lib/utils';

interface DealCardProps {
  deal: Deal;
}

const platformConfigs: Record<Platform, { name: string; gradient: string }> = {
  flipkart: { name: 'Flipkart', gradient: 'from-flipkart to-flipkart/80' },
  amazon: { name: 'Amazon', gradient: 'from-amazon to-amazon/80' },
  jiomart: { name: 'JioMart', gradient: 'from-jiomart to-jiomart/80' },
  myntra: { name: 'Myntra', gradient: 'from-myntra to-myntra/80' },
  swiggy: { name: 'Swiggy', gradient: 'from-swiggy to-swiggy/80' },
  bigbasket: { name: 'BigBasket', gradient: 'from-bigbasket to-bigbasket/80' },
};

export const DealCard = ({ deal }: DealCardProps) => {
  const platformConfig = platformConfigs[deal.platform];
  const discountPercent = deal.originalPrice 
    ? Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
    : deal.discount || 0;

  const handleOpenDeal = () => {
    window.open(deal.productUrl, '_blank');
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50">
      <div className={cn(
        "h-2 bg-gradient-to-r",
        platformConfig.gradient
      )} />
      
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {deal.imageUrl && (
            <div className="flex-shrink-0">
              <img
                src={deal.imageUrl}
                alt={deal.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {platformConfig.name}
              </Badge>
              {discountPercent > 0 && (
                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs">
                  {discountPercent}% OFF
                </Badge>
              )}
            </div>
            
            <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {deal.title}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-foreground">
                ₹{deal.price.toLocaleString()}
              </span>
              {deal.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{deal.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            {deal.rating && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{deal.rating}</span>
                {deal.reviews && (
                  <span>({deal.reviews.toLocaleString()} reviews)</span>
                )}
              </div>
            )}
          </div>
        </div>
        
        <Button
          onClick={handleOpenDeal}
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            View Deal
            <ExternalLink className="w-4 h-4" />
          </div>
        </Button>
        
        {deal.category && (
          <div className="mt-3 text-xs text-muted-foreground">
            Category: {deal.category}
          </div>
        )}
      </CardContent>
    </Card>
  );
};