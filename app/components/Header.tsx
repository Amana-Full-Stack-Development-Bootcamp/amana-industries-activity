/**
 * Header Component
 * Displays the navigation bar, company title, and description.
 */

interface HeaderProps {
  companyInfo: {
    name: string;
    description: string;
  };
}

export const Header = ({ companyInfo }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between h-16 border-b border-gray-200">
          <div className="flex items-center">
            <span className="font-bold text-xl text-gray-800">Logo</span>
          </div>
          <div className="flex items-center">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
              Menu
            </button>
          </div>
        </nav>
        {/* Title and Subtitle */}
        <div className="text-center py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            {companyInfo.name}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
            {companyInfo.description}
          </p>
        </div>
      </div>
    </header>
  );
};
