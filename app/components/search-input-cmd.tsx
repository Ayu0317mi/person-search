'use client';

import * as React from 'react';
import { SearchCommand } from '@/components/search-command';
import { searchUsers, getUserById } from '@/app/actions/actions';
import { User } from '../actions/schemas';
import { useState } from 'react';
import UserCard from './user-card';

interface SearchInputProps {
  userDetails: User | null;
  onUserUpdate: (updatedUser: User | null) => void;
}

export default function SearchInput({ userDetails, onUserUpdate }: SearchInputProps) {
  const [, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = React.useCallback(async (value: string) => {
    return searchUsers(value);
  }, []);

  const handleSelect = React.useCallback(async (user: User) => {
    setSelectedUserId(user.id);
    setLoading(true);

    try {
      const fetchedUserDetails = await getUserById(user.id);
      if (fetchedUserDetails) {
        onUserUpdate(fetchedUserDetails);  // Update the parent with the selected user
      }
      console.log('User details fetched on search-input:', user.id);
    } catch (error) {
      console.error('Error fetching user details:', error);
      onUserUpdate(null); 
    } finally {
      setLoading(false);
    }
  }, [onUserUpdate]);

  return (
    <div className="w-full max-w-md mx-auto">
      <SearchCommand<User>
        onSearch={handleSearch}
        onItemSelect={handleSelect}
        getItemId={(user) => user.id}
        getItemLabel={(user) => user.name}
        placeholder="Search users..."
        noResultsText="No users found."
      />
      {loading && <p>Loading user...</p>}
      {userDetails && <UserCard user={userDetails} onUserUpdate={onUserUpdate} />}
    </div>
  );
}