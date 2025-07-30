import { useState, useEffect } from 'react';
import { Deal } from '@/types/deal';
import { ApiService } from '@/services/api';
import { Header } from '@/components/Header';
import { DealsGrid } from '@/components/DealsGrid';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  const { toast } = useToast();

  const loadDeals = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    setIsRefreshing(true);

    try {
      const fetchedDeals = await ApiService.fetchDeals('amazon');
      setDeals(fetchedDeals);
      setLastUpdated(new Date().toISOString());
      
      toast({
        title: "Amazon Deals Updated",
        description: `Loaded ${fetchedDeals.length} fresh Amazon deals`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load deals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Header
            totalDeals={deals.length}
            lastUpdated={lastUpdated}
            onRefresh={() => loadDeals(false)}
            isRefreshing={isRefreshing}
          />

          <DealsGrid
            deals={deals}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
