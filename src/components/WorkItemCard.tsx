import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WorkItem } from "@/types";
import { toast } from "sonner";

interface WorkItemCardProps {
  item: WorkItem;
}

const WorkItemCard = ({ item }: WorkItemCardProps) => {
  const handleViewDetails = () => {
    toast.success(`Viewing details for ${item.title}`);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-qudpro-primary/10 rounded-lg text-qudpro-primary">
            {item.icon}
          </div>
          {item.count > 0 && (
            <span className="bg-qudpro-primary text-white px-2 py-1 rounded-full text-sm">
              {item.count}
            </span>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {item.description}
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4 group"
          onClick={handleViewDetails}
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
};

export default WorkItemCard;