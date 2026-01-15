import { Button } from '@/components/ui/button';
import { ChartNoAxesColumn, Library, LibraryBig, SquareLibrary } from 'lucide-react';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="sm:hidden flex gap-6 items-center justify-center my-8">
        <Button onClick={() => navigate("dashboard")} className="flex items-center gap-2">
          <ChartNoAxesColumn size={22} />
          <h1 className="">Dashboard</h1>
        </Button>
        <Button onClick={() => navigate("course")} className="flex items-center gap-2">
          <SquareLibrary size={22} />
          <h1 className="">Courses</h1>
        </Button>
      </div>
      <div className="hidden lg:block w-[250px] sm:w-[ 300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
        <div className="space-y-4">
          <Link to="dashboard" className="flex items-center gap-2 hover:bg-slate-900 py-2 px-2 rounded-md">
            <ChartNoAxesColumn size={22} />
            <h1 className="">Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2 hover:bg-slate-900 py-2 px-2 rounded-md">
            <Library size={22}/>
            <h1 className="">Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
