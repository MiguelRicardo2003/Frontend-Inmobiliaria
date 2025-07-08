import { Home, BarChart2, Settings, Users, Folder, Calendar, Mail, HelpCircle } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar = ({ isOpen }) => {
  return (
    <aside 
      className={`fixed top-0 left-0 z-10 h-full pt-16 transition-all duration-300 ease-in-out 
                 ${isOpen 
                   ? 'w-64 translate-x-0 shadow-lg' 
                   : 'w-64 -translate-x-full md:translate-x-0 md:w-20'
                 } 
                 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800`}
    >
      <div className="h-full flex flex-col justify-between overflow-y-auto pb-4">
        <nav className="px-4 py-4">
          <p className={`text-xs font-semibold text-gray-400 uppercase mb-4 ${!isOpen ? 'md:text-center' : ''}`}>
            {isOpen ? 'Main Menu' : 'Menu'}
          </p>
          
          <ul className="space-y-1">
            <NavItem 
              icon={<Home size={20} />} 
              label="Dashboard" 
              active={true} 
              isExpanded={isOpen} 
            />
            <NavItem 
              icon={<BarChart2 size={20} />} 
              label="Analytics" 
              active={false} 
              isExpanded={isOpen} 
            />
            <NavItem 
              icon={<Users size={20} />} 
              label="Customers" 
              active={false} 
              isExpanded={isOpen} 
            />
            <NavItem 
              icon={<Folder size={20} />} 
              label="Projects" 
              active={false} 
              isExpanded={isOpen} 
            />
            <NavItem 
              icon={<Calendar size={20} />} 
              label="Calendar" 
              active={false} 
              isExpanded={isOpen} 
            />
            <NavItem 
              icon={<Mail size={20} />} 
              label="Messages" 
              active={false} 
              isExpanded={isOpen} 
              badge="4"
            />
          </ul>
          
          <p className={`text-xs font-semibold text-gray-400 uppercase mt-8 mb-4 ${!isOpen ? 'md:text-center' : ''}`}>
            {isOpen ? 'Preferences' : 'Prefs'}
          </p>
          
          <ul className="space-y-1">
            <NavItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              active={false} 
              isExpanded={isOpen} 
            />
            <NavItem 
              icon={<HelpCircle size={20} />} 
              label="Help" 
              active={false} 
              isExpanded={isOpen} 
            />
          </ul>
        </nav>
        
        <div className={`px-4 py-4 ${isOpen ? 'block' : 'hidden md:block text-center'}`}>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            {isOpen ? (
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Need help?</p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">Check our documentation</p>
                <button className="mt-2 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-md transition-colors">
                  View Docs
                </button>
              </div>
            ) : (
              <HelpCircle className="w-5 h-5 mx-auto text-blue-500" />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
