'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs/db'
import { Users } from '@/configs/schema'
import { eq } from 'drizzle-orm'

export default function Provider({ children }) {
  const { user } = useUser()

  const verifyNewUser = async () => {
    const isUser = await fetchUser();
    if (isUser.length === 0) {
      insertNewUser()
      console.log('Novo usuário adicionado.')
      return;
    } 
    console.log('Usuário já existe.')
  }

  async function insertNewUser() {
    return await db.insert(Users).values({
      name: user.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
    })
  }

  async function fetchUser() {
    return await db.select().from(Users)
    .where(eq(Users.email,user?.primaryEmailAddress?.emailAddress));
  }

  React.useEffect(() => {
    user && verifyNewUser()
  }, [user])

  return <div>{children}</div>
}
