'use client';
import { CustomUser } from '@/app/api/auth/[...nextauth]/options';
import {
  createChatSchema,
  createChatSchemaType,
} from '@/app/validations/GroupChatValidation';
import { CHAT_GROUP_URL } from '@/lib/apiEndPoints';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { clearCache } from '@/app/actions/common';

export default function EditGroupChat({
  user,
  group,
  open,
  setOpen,
}: {
  user: CustomUser;
  group: GroupChatType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  useEffect(() => {
    setValue('title', group.title);
    setValue('passcode', group.passcode);
  });

  const onSubmit = async (payload: createChatSchemaType) => {
    // console.log("The payload is", payload);
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${CHAT_GROUP_URL}/${group.id}`,
        payload,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      if (data?.message) {
        setOpen(false);
        toast.success(data?.message);
        clearCache('dashboard');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong.please try again!');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register('title')} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register('passcode')} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? 'Processing..' : 'Submit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
