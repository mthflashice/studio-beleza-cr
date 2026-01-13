import { useState } from "react";
import { Instagram, MessageCircle } from "lucide-react";


export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* HEADER */}
      <header className="bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <img
              src="/logo-camila-animated.svg"
              alt="Studio de Beleza CR"
              className="w-14 h-14"
            />
            <div>
              <h1 className="text-3xl font-bold leading-tight">
                Studio de Beleza CR
              </h1>
              <p className="text-pink-100 text-sm">
                Agende seu horário de forma rápida e prática
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href="https://wa.me/5534997354857"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 transition p-3 rounded-full"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/studio_de_beleza_cr/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 transition p-3 rounded-full"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>

        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        
        <section className="bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Bem-vinda ao Studio de Beleza CR
          </h2>

          <p className="text-gray-600 mb-8">
            Aqui você agenda seus serviços com conforto, rapidez e segurança.
          </p>

          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
          >
            Clique de teste: {count}
          </button>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} Studio de Beleza CR — Todos os direitos reservados
      </footer>

    </div>
  );
}
