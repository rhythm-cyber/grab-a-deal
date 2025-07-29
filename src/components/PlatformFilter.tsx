import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Platform } from '@/types/deal';
import { cn } from '@/lib/utils';

interface PlatformFilterProps {
  selectedPlatforms: Platform[];
  onPlatformToggle: (platform: Platform) => void;
  dealCounts: Record<Platform, number>;
}

const platformConfigs: Record<Platform, { name: string; color: string; icon: string }> = {
  flipkart: { name: 'Flipkart', color: 'bg-flipkart text-flipkart-foreground', icon: '🛒' },
  amazon: { name: 'Amazon', color: 'bg-amazon text-amazon-foreground', icon: '📦' },
  jiomart: { name: 'JioMart', color: 'bg-jiomart text-jiomart-foreground', icon: '🏪' },
  myntra: { name: 'Myntra', color: 'bg-myntra text-myntra-foreground', icon: '👗' },
  swiggy: { name: 'Swiggy', color: 'bg-swiggy text-swiggy-foreground', icon: '🍕' },
  bigbasket: { name: 'BigBasket', color: 'bg-bigbasket text-bigbasket-foreground', icon: '🥬' },
};

export const PlatformFilter = ({ selectedPlatforms, onPlatformToggle, dealCounts }: PlatformFilterProps) => {
  const platforms = Object.keys(platformConfigs) as Platform[];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Filter by Platform</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {platforms.map((platform) => {
          const config = platformConfigs[platform];
          const isSelected = selectedPlatforms.includes(platform);
          const count = dealCounts[platform] || 0;
          
          return (
            <Button
              key={platform}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onPlatformToggle(platform)}
              className={cn(
                "flex items-center justify-between p-4 h-auto transition-all duration-200",
                isSelected && config.color
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{config.icon}</span>
                <span className="font-medium text-sm">{config.name}</span>
              </div>
              
              {count > 0 && (
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-xs",
                    isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
      
      {selectedPlatforms.length > 0 && (
        <Button
          variant="ghost"
          onClick={() => platforms.forEach(platform => {
            if (selectedPlatforms.includes(platform)) {
              onPlatformToggle(platform);
            }
          })}
          className="w-full text-sm text-muted-foreground hover:text-foreground"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
};