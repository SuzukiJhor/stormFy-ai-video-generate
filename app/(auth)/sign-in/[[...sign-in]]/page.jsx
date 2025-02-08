import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="h-screen flex">
      {/* Lado esquerdo com a imagem */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <Image 
          src="/login.jpg" 
          alt="Login" 
          width={600} 
          height={600} 
          className="max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Lado direito com o formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Bem-vindo!
          </h2>
          <SignIn />
        </div>
      </div>
    </div>
  )
}
