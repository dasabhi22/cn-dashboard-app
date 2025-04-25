import useDashboardStore from '../store/dashboardStore'; // Importing the global dashboard store (using Zustand)

import CategorySection from './CategorySection'; // Importing the reusable CategorySection component

const Dashboard = ({ openAddWidgetModal }) => {
  // Access the list of widget categories from the global store
  const categories = useDashboardStore(state => state.categories);
  
  return (
    <div className="space-y-8">
      {/* Loop through each category and render a CategorySection */}
      {categories.map(category => (
        <CategorySection 
          key={category.id}                 // Unique key for each category
          category={category}               // Pass the full category object to the section
          openAddWidgetModal={openAddWidgetModal} // Optional prop for modal control (if needed)
        />
      ))}
    </div>
  );
};

export default Dashboard;
