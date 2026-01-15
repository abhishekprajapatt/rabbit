import React from 'react';
import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 my-12 sm:mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
