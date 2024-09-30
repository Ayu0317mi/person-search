// user-edit-dialog.tsx
'use client';

import { editUser } from '../actions/actions';
import { userFormSchema, User, UserFormData, UserEditData } from '@/app/actions/schemas';
import { UserForm } from './user-form';
import MutableDialog, { ActionState } from '@/components/mutable-dialog';
import React from 'react';

interface UserEditDialogProps {
    user: User;
    onUpdateUser: (updatedUser: User) => void; 
}

export function UserEditDialog({ user }: UserEditDialogProps) {
    const handleEditUser = async (data: UserEditData): Promise<ActionState<User>> => {
        try {
            const updatedUser = await editUser(data.id, data);
            return {
                success: true,
                message: `User ${updatedUser.name} updated successfully`,
                data: updatedUser
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to update user'
            };
        }
    };

    const handleAction = async (data: { name: string; email?: string; phoneNumber: string; }): Promise<ActionState<User>> => {
        const userEditData: UserEditData = {
            id: user.id,
            ...data
        };
        return handleEditUser(userEditData);
    };

    const defaultValues: UserFormData = {
        name: user.name,
        email: user.email ?? '',
        phoneNumber: user.phoneNumber,
    };

    return (
        <MutableDialog
            formSchema={userFormSchema}
            FormComponent={UserForm}
            action={handleAction}
            triggerButtonLabel="Edit User"
            addDialogTitle="Edit User"
            dialogDescription="Fill out the form below to edit the user."
            submitButtonLabel="Edit User"
            defaultValues={defaultValues} 
        />
    );
}
