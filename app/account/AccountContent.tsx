"use client";

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { subscribe } from "diagnostics_channel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountContent = () => {

    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const { user, subscription, isLoading} = useUser();

    const [loading,setLoading] = useState(false);

    useEffect(() => {
       if (!loading && !user){
            router.replace('/'); 
        };
    },[isLoading, router, user, loading]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error} = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            if (error) {
                toast.error((error as Error).message);
            }
        }

        setLoading(false);
    }

    return ( 
            <div className="mb-7 px-6">
                {!subscription && (
                        <div className="flex flex-col gap-y-4 ">
                            <p className="text-white">No Active Plan.</p>
                            <Button onClick={subscribeModal.onOpen} className="w-[300px]">
                                Subscribe
                            </Button>
                        </div>
                    )}
                    {subscription && (
                            <div className="flex flex-col gap-y-4">
                                <p className="text-white">You are currently on the <b>{subscription?.prices?.products?.name}</b> plan</p>
                                <Button disabled={loading || isLoading} className="w-[300px]" onClick={redirectToCustomerPortal}>
                                    Open Customer Portal
                                </Button>
                            </div>
                        )}
            </div>
        );
}
 
export default AccountContent;
