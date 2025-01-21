//user-edit-dialog.tsx
'use client'

import { updateUser } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState } from '@/components/mutable-dialog'

interface UserEditDialogProps {
  user: User;
  onUserUpdated: (updatedUser: User) => void; // Callback for notifying parent
}

export function UserEditDialog({ user, onUserUpdated }: UserEditDialogProps) {
  const handleEditUser = async (data: UserFormData): Promise<ActionState<User>> => {
    try {
      const updatedUser = await updateUser(user.id, data);
      onUserUpdated(updatedUser); // Notify parent about the updated user
      return {
        success: true,
        message: `User ${updatedUser.name} updated successfully`,
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user' + (error instanceof Error ? error.message : String(error)),
      };
    }
  };

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleEditUser}
      triggerButtonLabel="Edit"
      editDialogTitle={`Edit ${user.name}`}
      dialogDescription={`Update the details of ${user.name} below.`}
      submitButtonLabel="Save Changes"
      defaultValues={{
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }}
    />
  );
}