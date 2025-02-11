import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="h-screen flex">
      <div className="w-full flex justify-center p-6 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Bem-vindo!
          </h2>
          <SignUp
          />
        </div>
      </div>
    </div>

  )
}