import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import AddWidgetModal from './components/AddWidgetModal';

function App() {
  // State to control the visibility of the "Add Widget" modal
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  
  return (
    // Main app container with a light gray background and full height
    <div className="min-h-screen bg-gray-100">
      
      {/* Header component with a button to trigger the Add Widget modal */}
      <Header onAddWidget={() => setIsAddWidgetOpen(true)} />
      
      {/* Main content area containing the dashboard */}
      <main className="container mx-auto py-6 px-4">
        <Dashboard openAddWidgetModal={() => setIsAddWidgetOpen(true)} />
      </main>
      
      {/* Conditionally render the AddWidgetModal when isAddWidgetOpen is true */}
      {isAddWidgetOpen && (
        <AddWidgetModal 
          onClose={() => setIsAddWidgetOpen(false)} // Closes the modal
        />
      )}
    </div>
  );
}

export default App;
