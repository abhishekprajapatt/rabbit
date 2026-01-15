import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Course from './Course';
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from '@/features/api/authApi';
import { toast } from 'sonner';

const Profile = () => {
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      error,
      isError,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('profilePhoto', profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || 'Profile updated!😎');
    }
    if (isError) {
      toast.error(error.message || 'Profile updated Failed.');
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) return <ProfileSkeleton />;
  const { user } = data;
  return (
    <div className="md:mx-36 mx-10 my-8 sm:my-10 ">
      <h1 className="font-bold text-3xl text-center md:text-left ml-[-10rem] sm:ml-auto font-serif ">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center ">
          <Avatar className="h-24 w-24 md:h-36 md:w-36 mb-4">
            <AvatarImage
              src={
                user?.photoUrl || 'https://wallpaperaccess.com/full/6856338.jpg'
              }
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <div className="sm:my-1">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name :
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="my-1">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
             Email:
              <span className="font-thin sm:font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email}
              </span>
            </h1>
          </div>
          <div className="my-1">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role :
              <span className="font-bold text-gray-600 dark:text-gray-300 ml-2">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <div className="">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" Size="sm" className="w-full sm:w-auto">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="eg. abhishek prajapatt"
                      className="col-span-3 text-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      Profile Photo
                    </Label>
                    <Input
                      onChange={onChangeHandler}
                      type="file"
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    disabled={updateUserIsLoading}
                    onClick={updateUserHandler}
                  >
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div>
    <h1 className="font-bold text-2xl text-center md:text-left">
      <Skeleton className="w-32 h-8" />
    </h1>
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
          <AvatarFallback>
            <Skeleton className="h-full w-full" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
    <div>
      <h1 className="font-medium text-lg">
        <Skeleton className="h-6 w-64" />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    </div>
  </div>
);

export default Profile;
