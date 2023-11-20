"use client";

import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useEffect } from "react";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";
import { Router } from "next/router";

const AuthModal = () => {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose , isOpen } = useAuthModal();


    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [onClose,router,session])

    const onChange = (open:boolean) => {
        if (!isOpen) {
            onClose();
        }
    }

    return (
        <Modal title="Welcome Back" description="Login to your account" isOpen={isOpen} onChange={onChange}>
            <Auth theme="dark" magicLink providers={["github"]} supabaseClient={supabaseClient} appearance={{theme: ThemeSupa, variables: {default: {colors: {brand: '#404040', brandAccent: '#22c55e'}}}}}/>
        </Modal>
    );
};

export default AuthModal;