/* //user-search.tsx
import { Suspense } from 'react';
import SearchInput from './search-input-cmd';
import UserCard from './user-card';
import { getUserById } from '@/app/actions/actions';

export default async function UserSearch({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
  // Resolve the searchParams asynchronously
  const resolvedSearchParams = await searchParams;
  const selectedUserId = resolvedSearchParams?.userId || null;

  // Fetch the user based on the selectedUserId
  const user = selectedUserId ? await getUserById(selectedUserId) : null;

  return (
    <div className="space-y-6">
      <SearchInput />
      {selectedUserId && (
        <Suspense fallback={<p>Loading user...</p>}>
          {user ? <UserCard user={user} /> : null}
        </Suspense>
      )}
    </div>
  );
} */

'use client';

import React, { Suspense, useState, useEffect } from 'react';
import SearchInput from './search-input-cmd';
import UserCard from './user-card';
import { getUserById } from '@/app/actions/actions'; 
import { User } from '@/app/actions/schemas';

export default function UserSearch() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    if (selectedUserId) {
      // Fetch user data by ID
      getUserById(selectedUserId).then((user) => {
        setSelectedUser(user);
      }).catch((error) => {
        console.error('Failed to fetch user:', error);
        setSelectedUser(null);
      });
    }
  }, [selectedUserId]);

  return (
    <div className="space-y-6">
      {/* Replace AsyncSelect with SearchInput */}
      <SearchInput onUserSelect={handleUserSelect} />

      {/* Render UserCard when a user is selected */}
      {selectedUser && (
        <Suspense fallback={<p>Loading user...</p>}>
          <UserCard user={selectedUser} />
        </Suspense>
      )}
    </div>
  );
}
