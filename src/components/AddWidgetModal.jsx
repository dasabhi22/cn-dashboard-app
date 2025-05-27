import React, { useState } from 'react';
import useDashboardStore from '../store/dashboardStore';

/**
 * AddWidgetModal Component
 * ------------------------
 * This modal allows users to either:
 * 1. Select and add existing widgets to a dashboard category
 * 2. Create and add a custom widget
 * 
 * Props:
 * - onClose: Function to close the modal
 */

const AddWidgetModal = ({ onClose }) => {
  // Destructuring states and actions from Zustand store
  const { categories, availableWidgets, toggleWidgetInCategory, addCustomWidget } = useDashboardStore();

  // Current active tab/category for widget selection - defaults to first category
  const [activeTab, setActiveTab] = useState(categories[0]?.id || 'cspm');

  // Mode switch: 'select' for adding existing, 'create' for new widget
  const [mode, setMode] = useState('select');

  // Local state for creating a custom widget
  const [customWidgetName, setCustomWidgetName] = useState('');
  const [customWidgetText, setCustomWidgetText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');

  // Filter widgets based on active tab/category
  const filteredWidgets = availableWidgets.filter(widget => widget.categoryId === activeTab);

  // Helper to check if a widget is already in a category
  const isWidgetInCategory = (widgetId, categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.widgets.some(w => w.id === widgetId) || false;
  };

  // Handler to toggle widget checkbox selection
  const handleToggleWidget = (widgetId, categoryId, isChecked) => {
    toggleWidgetInCategory(widgetId, categoryId, isChecked);
  };

  // Handler to create and save a custom widget
  const handleCreateWidget = () => {
    if (!customWidgetName.trim() || !selectedCategory) return;

    const newWidget = {
      id: `custom-${Date.now()}`, // Unique ID using timestamp
      name: customWidgetName,
      type: 'text', // Hardcoded type; can be extended later
      data: { text: customWidgetText || 'Custom widget content' }
    };

    addCustomWidget(selectedCategory, newWidget); // Save the widget to store
    onClose(); // Close modal after adding
  };

  // Helper function to get display name for category tabs
  const getCategoryDisplayName = (categoryName) => {
    const nameMap = {
      'CSPM Executive Dashboard': 'CSPM',
      'CWPP Dashboard': 'CWPP', 
      'Registry Scan': 'Registry',
      'Image Dashboard': 'Image',
      'Ticket Dashboard': 'Ticket'
    };
    return nameMap[categoryName] || categoryName.split(' ')[0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Add Widget</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            {/* Close Icon */}
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Mode Switch Tabs */}
          <div className="flex justify-center mb-4 border-b">
            <button
              className={`pb-2 px-4 ${mode === 'select' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setMode('select')}
            >
              Select Existing Widget
            </button>
            <button
              className={`pb-2 px-4 ${mode === 'create' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setMode('create')}
            >
              Create New Widget
            </button>
          </div>

          {/* ------------------ SELECT MODE ------------------ */}
          {mode === 'select' ? (
            <>
              <p className="mb-4">Personalize your dashboard by adding the following widget</p>
              
              {/* Category Tabs */}
              <div className="border-b mb-4">
                <div className="flex space-x-4 overflow-x-auto">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`pb-2 px-2 whitespace-nowrap ${activeTab === category.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                      onClick={() => setActiveTab(category.id)}
                    >
                      {getCategoryDisplayName(category.name)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Widget Checkboxes */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredWidgets.length > 0 ? (
                  filteredWidgets.map((widget) => (
                    <div key={widget.id} className="flex items-center p-3 border rounded-md">
                      <input
                        type="checkbox"
                        id={widget.id}
                        className="mr-3 h-5 w-5"
                        checked={isWidgetInCategory(widget.id, widget.categoryId)}
                        onChange={(e) => handleToggleWidget(widget.id, widget.categoryId, e.target.checked)}
                      />
                      <label htmlFor={widget.id} className="flex-grow cursor-pointer">{widget.name}</label>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    No widgets available for this category
                  </div>
                )}
              </div>
            </>
          ) : (
          /* ------------------ CREATE MODE ------------------ */
            <div className="space-y-4">
              {/* Widget Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Widget Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter widget name"
                  value={customWidgetName}
                  onChange={(e) => setCustomWidgetName(e.target.value)}
                />
              </div>

              {/* Widget Content Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Widget Content
                </label>
                <textarea
                  className="w-full p-2 border rounded-md h-24"
                  placeholder="Enter widget content"
                  value={customWidgetText}
                  onChange={(e) => setCustomWidgetText(e.target.value)}
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {getCategoryDisplayName(category.name)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>

          {/* Button changes based on mode */}
          {mode === 'select' ? (
            <button
              onClick={onClose} // Simply closes modal after selection
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm
            </button>
          ) : (
            <button
              onClick={handleCreateWidget} // Creates and saves widget
              disabled={!customWidgetName.trim() || !selectedCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Create Widget
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;