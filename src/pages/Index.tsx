import { useState, useEffect } from 'react';
import { Deal, Platform } from '@/types/deal';
import { ApiService } from '@/services/api';
import { Header } from '@/components/Header';
import { PlatformFilter } from '@/components/PlatformFilter';
import { DealsGrid } from '@/components/DealsGrid';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  const { toast } = useToast();

  const loadDeals = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    setIsRefreshing(true);

    try {
      const fetchedDeals = await ApiService.fetchDeals();
      setDeals(fetchedDeals);
      setLastUpdated(new Date().toISOString());
      
      toast({
        title: "Deals Updated",
        description: `Loaded ${fetchedDeals.length} fresh deals`,
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

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };


  const getDealCounts = (): Record<Platform, number> => {
    const counts: Record<Platform, number> = {
      flipkart: 0,
      amazon: 0,
      jiomart: 0,
      myntra: 0,
      swiggy: 0,
      bigbasket: 0,
    };

    deals.forEach(deal => {
      counts[deal.platform]++;
    });

    return counts;
  };

  useEffect(() => {
    loadDeals();
  }, []);

  useEffect(() => {
    if (selectedPlatforms.length === 0) {
      setFilteredDeals(deals);
    } else {
      setFilteredDeals(deals.filter(deal => selectedPlatforms.includes(deal.platform)));
    }
  }, [deals, selectedPlatforms]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Header
            totalDeals={filteredDeals.length}
            lastUpdated={lastUpdated}
            onRefresh={() => loadDeals(false)}
            isRefreshing={isRefreshing}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <PlatformFilter
                  selectedPlatforms={selectedPlatforms}
                  onPlatformToggle={handlePlatformToggle}
                  dealCounts={getDealCounts()}
                />
              </div>
            </div>

            <div className="lg:col-span-3">
            <DealsGrid
              deals={filteredDeals}
              isLoading={isLoading}
            />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
