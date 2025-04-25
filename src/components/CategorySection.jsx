import { useState } from 'react';
import WidgetCard from './WidgetCard';
import AddWidgetModal from './AddWidgetModal';

const CategorySection = ({ category }) => {
  // State to control the visibility of the Add Widget modal
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Category Title */}
      <h2 className="text-lg font-bold">{category.name}</h2>
      
      {/* Grid layout for displaying widgets under the category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render each widget as a card */}
        {category.widgets.map(widget => (
          <WidgetCard 
            key={widget.id}           // Unique key for each widget
            widget={widget}           // Widget data
            categoryId={category.id}  // Pass category ID for context (used inside WidgetCard)
          />
        ))}

        {/* Add Widget Card - opens modal on click */}
        <div 
          className="border border-dashed border-gray-300 rounded-lg bg-white p-4 flex flex-col items-center justify-center h-64 cursor-pointer"
          onClick={() => setIsAddWidgetOpen(true)}
        >
          <div className="text-gray-400 text-center">
            <span className="block text-3xl mb-2">+</span>
            <span>Add Widget</span>
          </div>
        </div>
      </div>

      {/* Modal for adding a new widget */}
      {isAddWidgetOpen && (
        <AddWidgetModal 
          onClose={() => setIsAddWidgetOpen(false)}  // Callback to close the modal
        />
      )}
    </div>
  );
};

export default CategorySection;
