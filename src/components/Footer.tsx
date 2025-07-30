import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <a 
              href="https://merchant.razorpay.com/policy/QyjshXj60OV9Wo/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a 
              href="https://merchant.razorpay.com/policy/QyjshXj60OV9Wo/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a 
              href="https://merchant.razorpay.com/policy/QyjshXj60OV9Wo/refund" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Refund
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a 
              href="https://merchant.razorpay.com/policy/QyjshXj60OV9Wo/shipping" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Shipping
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a 
              href="https://merchant.razorpay.com/policy/QyjshXj60OV9Wo/contact_us" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 Deals89 Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};