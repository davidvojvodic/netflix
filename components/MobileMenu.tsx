// Importing the react library
import React from "react";

// Creating a TypeScript interface for the properties and its types that can be passed as props to the component
interface MobileMenuProps {
  visible?: boolean;
}

// Creating a function component that respects the above-defined interface, destructures the received object and renders JSX based on it
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  // If the visibility prop is set to false, don't render anything.
  if (!visible) {
    return null;
  }

  // Rendering the menu content in the form of JSX code
  return (
    <div className="bg-black w-56 absolute top-8 left-0 flex flex-col py-5 border-2 border-gray-800">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
        <div className="px-3 text-center text-white hover:underline">
          Series
        </div>
        <div className="px-3 text-center text-white hover:underline">Films</div>
        <div className="px-3 text-center text-white hover:underline">
          New & Popular
        </div>
        <div className="px-3 text-center text-white hover:underline">
          My List
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Browse by Languages
        </div>
      </div>
    </div>
  );
};

// Exporting the finalized component to use it wherever needed
export default MobileMenu;
