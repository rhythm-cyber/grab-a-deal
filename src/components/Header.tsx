import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Zap } from 'lucide-react';

interface HeaderProps {
  totalDeals: number;
  lastUpdated: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const Header = ({ totalDeals, lastUpdated, onRefresh, isRefreshing }: HeaderProps) => {
  return (
    <div className="text-center space-y-6 mb-12">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Zap className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Deal Aggregator
          </h1>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the best deals from top shopping platforms. 
          Unlock exclusive affiliate links for just ₹0.89!
        </p>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="secondary" className="text-sm">
            {totalDeals} Active Deals
          </Badge>
          
          <Badge variant="outline" className="text-sm">
            Last Updated: {new Date(lastUpdated).toLocaleTimeString()}
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="text-sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-foreground mb-2">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</span>
            Browse deals from top platforms
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Pay ₹0.89 to unlock affiliate link
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Shop and save with exclusive deals
          </div>
        </div>
      </div>
    </div>
  );
};