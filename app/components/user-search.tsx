'use client';
import { useEffect, useState } from 'react';
import SearchInput from './search-input-cmd';
import { getUserById } from '@/app/actions/actions';
import { User } from '@/app/actions/schemas';

export default function UserSearch({ searchParams }: { searchParams: { userId?: string } }) {
  const { userId } = searchParams || {};
  const [userDetails, setUserDetails] = useState<User | null>(null);

  // Fetch user details when userId changes
  useEffect(() => {
    if (userId) {
      getUserById(userId).then(setUserDetails);
      console.log('User details fetched for user ID:', userId);
    }
  }, [userId]);

  const handleUserUpdate = (updatedUser: User | null) => {
    setUserDetails(updatedUser); // Update the user details
  };

  return (
    <div className="space-y-6">
      <SearchInput userDetails={userDetails} onUserUpdate={handleUserUpdate} />
    </div>
  );
}