//search-input-cmd.tsx
'use client';

import * as React from 'react';
import { SearchCommand } from '@/components/search-command';
import { searchUsers, getUserById } from '@/app/actions/actions';
import { User } from '../actions/schemas';
import { useState } from 'react';
import UserCard from './user-card';

export default function SearchInput() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = React.useCallback(async (value: string) => {
    return searchUsers(value);
  }, []);

  const handleSelect = React.useCallback(async (user: User) => {
    setSelectedUserId(user.id);
    setLoading(true);

    try {
      const userDetails = await getUserById(user.id);
      setUserDetails(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  }, []);

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
      {userDetails && <UserCard user={userDetails} />}
    </div>
  );
}
