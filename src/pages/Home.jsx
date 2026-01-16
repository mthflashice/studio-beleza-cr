import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-center px-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">
        Studio de Beleza CR
      </h1>

      <p className="text-gray-600 mb-8 max-w-md">
        Agende seus serviços com conforto, rapidez e segurança.
      </p>

      <Link
        to="/agendamento"
        className="bg-pink-500 text-white px-8 py-4 rounded-full font-bold hover:bg-pink-600 transition"
      >
        Agendar Horário
      </Link>
    </div>
  )
}
