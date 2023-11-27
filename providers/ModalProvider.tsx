"use client";

import Modal from '@/components/Modal'
import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';

import { useState , useEffect } from 'react'
import { ProductWithPrice } from '@/types';
import SubscribeModal from '@/components/SubscribeModal';

interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
    products
}) => {

    const [isMounted,setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
         <AuthModal />
         <SubscribeModal products={products} />
         <UploadModal />
        </>
    );
};

export default ModalProvider;