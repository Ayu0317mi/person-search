//user-search.tsx
'use client'

import { useState } from 'react'
//import AsyncSelect from 'react-select/async'
import CustomAsyncSelect from './custom-asyncselect'
import { searchUsers } from '@/app/actions/actions'
import { UserCard } from './user-card'
import { User } from '@/app/actions/schemas'

// Option type remains the same
interface OptionValue<T = User> {
  value: string
  label: string
  user: User
}

export default function UserSearch() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const loadOptions = async (inputValue: string): Promise<OptionValue[]> => {
    const users = await searchUsers(inputValue)
    return users.map(user => ({ value: user.id, label: user.name, user }))
  }

  const handleChange = (option: OptionValue | null) => {
    setSelectedUser(option ? option.user : null)
  }

  return (
    <div className="space-y-6">
      <CustomAsyncSelect
        searchAction={loadOptions}
        addAction={handleChange}
        placeholder="Search for a user..."
        isClearable
      />
      {selectedUser && <UserCard user={selectedUser} />}
    </div>
  )
}
