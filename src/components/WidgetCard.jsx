import { XMarkIcon } from '@heroicons/react/24/outline';
import useDashboardStore from '../store/dashboardStore';
import DonutChart from './widgets/DonutChart';
import RiskMeter from './widgets/RiskMeter';
import NoDataWidget from './widgets/NoDataWidget';

const WidgetCard = ({ widget, categoryId }) => {
  // Access the removeWidget function from the global dashboard store
  const removeWidget = useDashboardStore(state => state.removeWidget);
  
  // Handler to remove the widget from the dashboard
  const handleRemove = () => {
    removeWidget(categoryId, widget.id);
  };
  
  // Render widget content based on its type
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'donut-chart':
        return <DonutChart data={widget.data} />; // Donutt chart widget
      case 'risk-meter':
        return <RiskMeter data={widget.data} />; // Risk meter widget
      case 'line-chart':
        // If data is not available, show a fallback component
        if (!widget.data.available) {
          return <NoDataWidget />;
        }
        return <div>Line Chart</div>; // Placeholder for future line chart implementation
      case 'text':
      default:
        // Render plain text content or a fallback message
        return <div className="p-4">{widget.data.text || 'Widget content'}</div>;
    }
  };
  
  return (
    // Main widget card container with styling
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header section with widget title and remove button */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-medium">{widget.name}</h3>
        <button 
          onClick={handleRemove}
          className="text-gray-400 hover:text-gray-600"
          title="Remove widget"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      
      {/* Widget content section */}
      <div className="p-4 h-48">
        {renderWidgetContent()}
      </div>
    </div>
  );
};

export default WidgetCard;
