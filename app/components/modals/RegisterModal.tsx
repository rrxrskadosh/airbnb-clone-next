'use client';
import React, { useCallback, useState } from 'react';
// React Icons
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
// Axios
import axios from 'axios';

// React Hook Form
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

// Components
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/registe', data)
        .then(() => {
            registerModal.onClose()
        })
        .catch((error) => {
            toast.error('Something Went Wrong!')
        })
        .finally(()=> {
            setIsLoading(false)
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
            title='Welcome to Airbnb'
            subtitle='Create an account!'
            center
            />
            
            <Input 
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                label="Password"
                type="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />  
            <Button 
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}}
            /> 
            <div className='flex justify-center flex-row items-center gap-2'>
                <div className='text-neutral-800 cursor-pointer hover:underline'>Already have an account</div>
                <div onClick={registerModal.onClose} className='text-neutral-800 cursor-pointer hover:underline'>Log in</div>         
            </div>
              
        </div>
    )

    return (
        <Modal disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;