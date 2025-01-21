//search-input-cmd.tsx
'use client';

import * as React from 'react';
import { SearchCommand } from '@/components/search-command';
import { searchUsers, getUserById } from '@/app/actions/actions';
import { User } from '../actions/schemas';
import { useState } from 'react';
import UserCard from './user-card';

export default function SearchInput() {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string) => {
    try {
      return await searchUsers(value);
    } catch (error) {
      console.error("Error during search:", error);
      return [];
    }
  };

  const handleSelect = async (user: User) => {
    setLoading(true);
    try {
      const details = await getUserById(user.id);
      setUserDetails(details);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

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
      {loading && <p className="text-muted-foreground text-center mt-4">Loading user details...</p>}
      {userDetails && <UserCard user={userDetails} onUserUpdate={setUserDetails} />}
    </div>
  );
}