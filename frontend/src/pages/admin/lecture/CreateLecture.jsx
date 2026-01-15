import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from '@/features/api/courseApi';
import { toast } from 'sonner';
import Lecture from './Lecture';

const CreateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState('');
  const [CreateLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();
  const {
    data: lectureData,
    isLoading: lectureIsLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await CreateLecture({ lectureTitle, courseId });
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam,
          dicta.
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ratione!
        </p>
      </div>
      <div className="my-2">
        <Label>Title</Label>
        <Input
          type="text"
          vlaue={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          placeholder="Your Title Name"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate(`/admin/course/${courseId}`)}
          variant="outline"
          className=""
        >
          Back to Course
        </Button>
        <Button
          disabled={isLoading}
          onClick={createLectureHandler}
          className=""
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Create Lecture'
          )}
        </Button>
      </div>
      <div className="mt-10">
        {lectureIsLoading ? (
          <p>LectureLoading...</p>
        ) : lectureError ? (
          <p>Lectures loading failed!</p>
        ) : lectureData.lectures.length === 0 ? (
          <p>Lectures Not Availabels</p>
        ) : (
          lectureData.lectures.map((lecture, index) => (
            <Lecture
              key={lecture._id}
              lecture={lecture}
              courseId={courseId}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
