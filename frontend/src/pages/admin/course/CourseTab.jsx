import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Skeleton } from '@/components/ui/skeleton';
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: '',
    subTitle: '',
    description: '',
    category: '',
    courseLevel: '',
    coursePrice: '',
    courseThumbnail: '',
  });
  const params = useParams();
  const courseId = params.courseId;
  const {
    data: courseByIdData,
    isLoading: courseByIdIsLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);

  const [publishCourse, {}] = usePublishCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: '',
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState('');
  const navigate = useNavigate();
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append('courseTitle', input.courseTitle);
    formData.append('subTitle', input.subTitle);
    formData.append('description', input.description);
    formData.append('category', input.category);
    formData.append('courseLevel', input.courseLevel);
    formData.append('coursePrice', input.coursePrice);
    formData.append('courseThumbnail', input.courseThumbnail);
    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.data.message || 'Failed to publish or unpublish course'
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || 'Course Updated!');
      navigate('/admin/course');
    }
    if (error) {
      toast.error(error.data.message || 'Failed Updated Course!');
    }
  }, [isSuccess, error]);

  if (courseByIdIsLoading) return <CourseTabSkeleton />;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information.</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={courseByIdData?.course.lectures.length === 0}
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? 'false' : 'true'
              )
            }
          >
            {courseByIdData?.course.isPublished ? 'Unpublished' : 'Publish'}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Course Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. FullStack Developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a FullStack Developer from zero to hero in 6 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor className="dark:text-white" input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Data Structures Algorithms">Data Structures Algorithms</SelectItem>
                    <SelectItem value="FullStack Development">FullStack Development</SelectItem>
                    <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                    <SelectItem value="Backend Deveopment">Backend Deveopment</SelectItem>
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
                    <SelectItem value="Assembly language">Assembly language</SelectItem>
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
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="₹"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2 rounded-sm"
                alt="course Thumbnail"
              />
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/admin/course')} variant="outline">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={updateCourseHandler}
              variant=""
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;

const CourseTabSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row justify-between">
      <Skeleton className="h-6 w-1/3" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <div className="flex items-center gap-5">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);
