import BuyCourse from '@/components/BuyCourse';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseCourseApi';
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react';
import React from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <CourseDetailsSkeleton />;
  if (isError) return <h1>Failed to load course details</h1>;
  const { course, purhcased } = data;

  const handleContinue = () => {
    if (purhcased) {
      navigate(`/course-progress/${courseId}`);
    }
  };
  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-2 md:mx-auto py-8 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course?.subTitle}</p>
          <p>
            Created By {''}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createAt?.split('T')[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course?.description }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course?.lectures.length}</CardDescription>
              <CardContent>
                {course?.lectures.map((lecture, index) => (
                  <div className="flex items-center gap-3 text-sm" key={index}>
                    <span>
                      {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                    </span>
                    <p>{lecture?.lectureTitle}</p>
                  </div>
                ))}
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course?.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1 className="">Lecture title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purhcased ? (
                <Button onClick={handleContinue} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourse courseId={courseId} className="w-full" />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;


const CourseDetailsSkeleton = () => {
  <div className="space-y-5">
    <div className="bg-[#2D2F31] text-white">
      <div className="max-w-7xl mx-2 md:mx-auto py-8 md:px-8 flex flex-col gap-2">
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/4 h-6" />
        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-1/4 h-4" />
        </div>
        <Skeleton className="w-1/4 h-4" />
      </div>
    </div>
    <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
      <div className="w-full lg:w-1/2 space-y-5">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-32" />
        <Card>
          <CardHeader>
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-1/4 h-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-6 mb-2" />
            <Skeleton className="w-full h-6 mb-2" />
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-1/3">
        <Card>
          <CardContent className="p-4 flex flex-col">
            <Skeleton className="w-full aspect-video h-40 mb-4" />
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-1/4 h-4 my-2" />
            <Skeleton className="w-1/3 h-6" />
          </CardContent>
          <CardFooter className="flex justify-center p-4">
            <Skeleton className="w-full h-10" />
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>;
};
