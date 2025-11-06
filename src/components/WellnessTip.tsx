import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface WellnessTipProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const WellnessTip = ({ icon: Icon, title, description }: WellnessTipProps) => {
  return (
    <Card className="border-none shadow-card hover:shadow-soft transition-all duration-300 h-full">
      <CardContent className="p-6 space-y-4">
        <div className="inline-flex rounded-full bg-accent p-3">
          <Icon className="h-6 w-6 text-accent-foreground" />
        </div>
        
        <h3 className="font-heading text-xl font-semibold">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default WellnessTip;
