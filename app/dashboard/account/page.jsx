import React from 'react'
import { UserProfile } from '@clerk/nextjs'
export default function Account() {

    return (
        <div className="h-screen flex">
            <div className="w-full flex justify-center border-2 border-emerald-700">
                <div className="p-6">
                    <UserProfile />
                </div>
            </div>
        </div>

    )
}
