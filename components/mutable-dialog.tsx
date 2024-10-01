// app/components/mutable-dialog.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { ZodType } from 'zod';

export interface ActionState<U> {
  success: boolean;
  message: string | null;
  data?: U;
}

interface GenericDialogProps<T extends FieldValues, U> {
  formSchema: ZodType<T>;
  FormComponent: React.ComponentType<{ form: UseFormReturn<T> }>;
  action?: (data: T) => Promise<ActionState<U>>;
  triggerButtonLabel?: string;
  addDialogTitle?: string;
  editDialogTitle?: string;
  dialogDescription?: string;
  submitButtonLabel?: string;
  defaultValues?: DefaultValues<T>; // If present, this will indicate edit mode
  onSuccess?: (data: U) => void; // onSuccess now accepts type U
}

export default function MutableDialog<T extends FieldValues, U>({
  formSchema,
  FormComponent,
  action, 
  defaultValues,
  triggerButtonLabel = defaultValues ? 'Edit' : 'Add',
  addDialogTitle = 'Add',
  editDialogTitle = 'Edit',
  dialogDescription = defaultValues ? 'Make changes to your item here. Click save when you\'re done.' : 'Fill out the form below to add a new item.',
  submitButtonLabel = defaultValues ? 'Save' : 'Add',
  onSuccess, // Destructure onSuccess prop
}: GenericDialogProps<T, U>) {
  const [open, setOpen] = useState(false);

  const form = useForm<T>({
    resolver: async (values) => {
      try {
        console.log('Form values before validation:', values); // Log the form values before validation
        const result = formSchema.parse(values);
        console.log('Validation passed:', result); // Log the result after validation
        return { values: result, errors: {} };
      } catch (err: any) {
        console.log('Validation errors:', err.formErrors?.fieldErrors); // Log the validation errors
        return { values: {}, errors: err.formErrors?.fieldErrors };
      }
    },
    defaultValues: defaultValues,
  });

  // Reset the form when the dialog is closed
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  async function handleSubmit(data: T) {
    if (!action) {
      throw new Error("No action function provided");
    }

    console.log('calling submit');
    const actions = await action(data);  // Call the provided action directly

    console.log('actions:', actions);

    if (actions.success) {
      const toastMessage = actions.message;
      toast.success(toastMessage);
      if (onSuccess && actions.data) { // Call onSuccess with the data
        onSuccess(actions.data);
      }
    } else {
      const toastMessage = actions.message;
      toast.error(toastMessage);
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerButtonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{defaultValues ? editDialogTitle : addDialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormComponent form={form} />
          <div className="mt-4">
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Close</Button>
              <Button type="submit">{submitButtonLabel}</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
