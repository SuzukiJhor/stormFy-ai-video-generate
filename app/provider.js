'use client'
import { db } from '@/configs/db'
import { Users } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import React from 'react'

export default function Provider({children}) {
  const { user } = useUser();

  const newUser = async () => {
    const result = await db.select().from(Users)
    .where(eq(Users.email,user?.primaryEmailAddress?.emailAddress));

    if (!result[0]) {
      await db.insert(Users).values({
        name: user.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      })
    }
  }

  React.useEffect(() => {
    user && newUser();
  }), [user]

  return (
    <div>{children}</div>
  )
}
