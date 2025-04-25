import { create } from 'zustand';
import { jsonData } from '../data/jsonData';

const useDashboardStore = create((set) => ({
  categories: jsonData.categories,
  availableWidgets: jsonData.availableWidgets,
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),

  addWidget: (categoryId, widget) => set((state) => {
    const updatedCategories = state.categories.map(category => {
      if (category.id === categoryId) {
        // Check if widget already exists
        const widgetExists = category.widgets.some(w => w.id === widget.id);
        if (widgetExists) return category;

        return {
          ...category,
          widgets: [...category.widgets, widget]
        };
      }
      return category;
    });
    
    return { categories: updatedCategories };
  }),
  addCustomWidget: (categoryId, widget) => set((state) => {
    const updatedCategories = state.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: [...category.widgets, widget]
        };
      }
      return category;
    });
    
    return { categories: updatedCategories };
  }),

  removeWidget: (categoryId, widgetId) => set((state) => {
    const updatedCategories = state.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    });
    
    return { categories: updatedCategories };
  }),

  getFilteredWidgets: (state) => {
    const query = state.searchQuery.toLowerCase();
    if (!query) return state.availableWidgets;
    
    return state.availableWidgets.filter(widget => 
      widget.name.toLowerCase().includes(query)
    );
  },

  toggleWidgetInCategory: (widgetId, categoryId, isChecked) => set((state) => {
    if (isChecked) {
      // Find the widget in availableWidgets
      const widgetToAdd = state.availableWidgets.find(w => w.id === widgetId);
      if (!widgetToAdd) return state;

      // Create a new widget instance
      const newWidget = {
        id: widgetId,
        name: widgetToAdd.name,
        type: "text", // Default type
        data: { text: "Widget content goes here" }
      };
      

      return {
        categories: state.categories.map(category => {
          if (category.id === categoryId) {
            // Check if widget already exists
            const widgetExists = category.widgets.some(w => w.id === widgetId);
            if (widgetExists) return category;

            return {
              ...category,
              widgets: [...category.widgets, newWidget]
            };
          }
          return category;
        })
      };
    } else {
      // Remove widget from category
      return {
        categories: state.categories.map(category => {
          if (category.id === categoryId) {
            return {
              ...category,
              widgets: category.widgets.filter(widget => widget.id !== widgetId)
            };
          }
          return category;
        })
      };
    }
    
  })
}));

export default useDashboardStore;