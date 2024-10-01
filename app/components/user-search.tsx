// app/components/user-search.tsx

'use client'

import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { searchUsers } from '@/app/actions/actions';
import { UserCard } from './user-card';
import { User } from '@/app/actions/schemas';

// Option type remains the same
interface OptionValue<T = User> {
  value: string;
  label: string;
  user: T;
}

export default function UserSearch() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    // Initialize with your users or fetch from server
    { id: '1', name: 'John Doe', phoneNumber: '123-456-7890', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', phoneNumber: '234-567-8901', email: 'jane@example.com' },
    { id: '3', name: 'Alice Johnson', phoneNumber: '345-678-9012', email: 'alice@example.com' },
    { id: '4', name: 'Bob Williams', phoneNumber: '456-789-0123', email: 'bob@example.com' },
    { id: '5', name: 'Charlie Brown', phoneNumber: '567-890-1234', email: 'charlie@example.com' },
  ]);

  const loadOptions = async (inputValue: string): Promise<OptionValue[]> => {
    const filteredUsers = await searchUsers(inputValue);
    return filteredUsers.map(user => ({ value: user.id, label: user.name, user }));
  };

  const handleChange = (option: OptionValue | null) => {
    setSelectedUser(option ? option.user : null);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setSelectedUser(updatedUser);
  };

  return (
    <div className="space-y-6">
      <AsyncSelect
        cacheOptions={false}  // Disable cache to ensure updated data is loaded
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleChange}
        placeholder="Search for a user..."
        isClearable
      />
      {selectedUser && <UserCard user={selectedUser} onUpdateUser={handleUpdateUser} />}
    </div>
  );
}
