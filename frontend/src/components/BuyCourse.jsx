import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseCourseApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BuyCourse = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    if(isSuccess){
        if(data?.url){
            window.location.href = data.url;
        }else {
            toast.error("Invalid response from server");
        }
    }

    if(isError){
        toast.error(error?.data?.message || "Create Checkout Session Failed");
        console.log(error);
    }
  },[data, isSuccess, isError, error]);
  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        'Purchase Course'
      )}
    </Button>
  );
};

export default BuyCourse;
