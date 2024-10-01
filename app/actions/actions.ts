// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { User, userSchema } from './schemas'


const users: User[] = [
  { id: '1', name: 'John Doe', phoneNumber: '123-456-7890', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', phoneNumber: '234-567-8901', email: 'jane@example.com' },
  { id: '3', name: 'Alice Johnson', phoneNumber: '345-678-9012', email: 'alice@example.com' },
  { id: '4', name: 'Bob Williams', phoneNumber: '456-789-0123', email: 'bob@example.com' },
  { id: '5', name: 'Charlie Brown', phoneNumber: '567-890-1234', email: 'charlie@example.com' },
]

export async function searchUsers(query: string): Promise<User[]> {
  //   const users = await getUsers()
  console.log('Searching users with query:', query)
  return users.filter(user => user.name.toLowerCase().startsWith(query.toLowerCase()))
}

export async function addUser(data: Omit<User, 'id'>): Promise<User> {
  //   const users = await getUsers() // Load current users
  const newId = (users.length + 1).toString()
  const newUser = { ...data, id: newId }
  const validatedUser = userSchema.parse(newUser)
  users.push(validatedUser)
  return validatedUser
}


export async function editUser(id: string, data: Partial<User>): Promise<User> {
  console.log(`Editing user with ID: ${id}`); // Debugging log
  //   const users = await getUsers() // Load current users
  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex === -1) throw new Error('User not found')
  const updatedUser = { ...users[userIndex], ...data }
  const validatedUser = userSchema.parse(updatedUser)
  users[userIndex] = validatedUser

  console.log('User edited:', updatedUser)
  console.log('All User:', users)
  revalidatePath('/')
  return validatedUser
}
