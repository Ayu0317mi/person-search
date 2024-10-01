// user-edit-dialog.tsx
'use client';

import { editUser } from '../actions/actions';
import { userFormSchema, User, UserFormData, UserEditData } from '@/app/actions/schemas';
import { UserForm } from './user-form';
import MutableDialog, { ActionState } from '@/components/mutable-dialog';
import React from 'react';

interface UserEditDialogProps {
    user: User;
    onSuccess: (updatedUser: User) => void; // Define onSuccess prop
}


export function UserEditDialog({ user, onSuccess }: { user: User, onSuccess: () => void }) {
    const handleEditUser = async (data: UserEditData): Promise<ActionState<User>> => {
      try {
        const updatedUser = await editUser(data.id, data);
        onSuccess(); // Call onSuccess after successful edit
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
  
    const handleAction = async (data: UserFormData): Promise<ActionState<User>> => {
        const userEditData: UserEditData = {
            id: user.id,
            ...data
        };
        return handleEditUser(userEditData);
    };
  
    return (
      <MutableDialog<UserFormData, User>
        key={`UserEditDialog-${user.id}`}
        formSchema={userFormSchema}
        FormComponent={UserForm}
        action={handleAction}
        triggerButtonLabel="Edit User"
        addDialogTitle="Edit User"
        dialogDescription="Fill out the form below to edit the user."
        submitButtonLabel="Edit User"
        defaultValues={{ phoneNumber: user.phoneNumber, email: user.email, name: user.name }}
        onSuccess={onSuccess} // Pass onSuccess to MutableDialog
      />
    );
  }
