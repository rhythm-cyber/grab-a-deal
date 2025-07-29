import { Deal } from '@/types/deal';
import { DealCard } from './DealCard';

interface DealsGridProps {
  deals: Deal[];
  onUnlock?: (dealId: string) => void;
  isLoading?: boolean;
}

export const DealsGrid = ({ deals, onUnlock, isLoading }: DealsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-64 bg-muted/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No deals found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or check back later for new deals!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          onUnlock={onUnlock}
        />
      ))}
    </div>
  );
};