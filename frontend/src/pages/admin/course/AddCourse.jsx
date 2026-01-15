import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateCourseMutation } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState();
  const [category, setCategory] = useState();

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || 'Course created.');
      navigate('/admin/course');
    }
  }, [error, isSuccess]);
  return (
    <div>
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam,
          dicta.
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ratione!
        </p>
      </div>
      <div className="">
        <Label>Title</Label>
        <Input
          type="text"
          vlaue={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Your Course Name"
        />
      </div>
      <div className="my-2">
        <Label>Category</Label>
        <Select onValueChange={getSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="Data Structures Algorithms">
                Data Structures Algorithms
              </SelectItem>
              <SelectItem value="FullStack Development">
                FullStack Development
              </SelectItem>
              <SelectItem value="Frontend Development">
                Frontend Development
              </SelectItem>
              <SelectItem value="Backend Deveopment">
                Backend Deveopment
              </SelectItem>
              <SelectItem value="MERN Stack">MERN Stack</SelectItem>
              <SelectItem value="Devops">Devops</SelectItem>
              <SelectItem value="Docker">Docker</SelectItem>
              <SelectItem value="Trading">Trading</SelectItem>
              <SelectItem value="Kubernetes">Kubernetes</SelectItem>
              <SelectItem value="ReactJs">ReactJs</SelectItem>
              <SelectItem value="NextJs">NextJs</SelectItem>
              <SelectItem value="NodeJs">NodeJs</SelectItem>
              <SelectItem value="CI/CD">CI/CD</SelectItem>
              <SelectItem value="Sprint Boots">Sprint Boots</SelectItem>
              <SelectItem value="C">C</SelectItem>
              <SelectItem value="C++">C++</SelectItem>
              <SelectItem value="Java">Java</SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="R">R</SelectItem>
              <SelectItem value="Php">PHP</SelectItem>
              <SelectItem value="Ruby">Ruby</SelectItem>
              <SelectItem value="Swift">Swift</SelectItem>
              <SelectItem value="Matlab">Matlab</SelectItem>
              <SelectItem value="Peri">Peri</SelectItem>
              <SelectItem value="Scala">Scala</SelectItem>
              <SelectItem value="Sql">SQL</SelectItem>
              <SelectItem value="Assembly language">
                Assembly language
              </SelectItem>
              <SelectItem value="Object Pascal">Oject Pascal</SelectItem>
              <SelectItem value="Visual Basic">Visual</SelectItem>
              <SelectItem value="Dart">Dart</SelectItem>
              <SelectItem value="Erlang">Erlang</SelectItem>
              <SelectItem value="F#">F#</SelectItem>
              <SelectItem value="Haskell">Haskell</SelectItem>
              <SelectItem value="Julia">Julia</SelectItem>
              <SelectItem value="Kotlin">Kotlin</SelectItem>
              <SelectItem value="Objective C">Objective C</SelectItem>
              <SelectItem value="Html">Html</SelectItem>
              <SelectItem value="Css">Css</SelectItem>
              <SelectItem value="Tailwind Css">Tailwind Css</SelectItem>
              <SelectItem value="Bootstrap">Bootstrap</SelectItem>
              <SelectItem value="Gsap">Gsap</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate('/admin/course')}
          variant="outline"
          className=""
        >
          Back
        </Button>
        <Button disabled={isLoading} onClick={createCourseHandler} className="">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Create'
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddCourse;
