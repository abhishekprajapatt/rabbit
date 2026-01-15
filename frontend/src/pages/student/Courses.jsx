import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Course from './Course';
import { useGetPublishedCourseQuery } from '@/features/api/courseApi';

const Courses = () => {
    const {data, isLoading, isError} = useGetPublishedCourseQuery();
    console.log(data)

    if(isError) return <h1 className="text-gray-600 font-bold font-serif">Some Error Occurred while fetching courses...</h1>
  return (
    <div className="bg-gray-50 dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-2 md:p-6">
        <h1 className="font-bold text-2xl sm:text-4xl text-center mb-6 sm:mb-10 font-serif text-gray-800 dark:text-gray-400">What to learn next</h1>
        <h1 className="font-bold text-md sm:text-3xl mb-6 sm:mb-10 text-gray-700 dark:text-gray-500">Recommended for you</h1>
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? Array.from({length:8}).map((_, index) => (
                <>
                    <div key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
                        <Skeleton className="w-full h-36" />
                        <div className="px-5 py-4 space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                    </div>
                </> 
                ))
                : (
                    data?.courses && data?.courses.map((course, index) => <Course key={index} course={course} />)
                )
            }
        </div>
      </div>
    </div>
  );
};


export default Courses;

