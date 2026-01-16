import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Calendar,
  Clock,
  Scissors,
  User,
  Phone,
  Check,
  Instagram,
  MessageCircle,
} from "lucide-react";

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [customServiceText, setCustomServiceText] = useState("");

  const services = [
    { id: 1, name: "Escova ou Chapa", duration: "30 min", price: "R$ 25,00", icon: "💨" },
    { id: 2, name: "Corte Simples + Escova", duration: "1 hora", price: "R$ 50,00", icon: "✂️" },
    { id: 3, name: "Hidratação/Nutrição", duration: "1 hora", price: "R$ 60,00", icon: "💧" },
    { id: 4, name: "Coloração + Escova", duration: "1h30 a 2h", price: "R$ 55,00", icon: "🎨" },
    { id: 5, name: "Aplicação Coloração Cliente", duration: "1 hora", price: "R$ 30,00", icon: "🖌️" },
    { id: 6, name: "Progressiva", duration: "3 a 4 horas", price: "R$ 150,00", icon: "💆‍♀️" },
    { id: 7, name: "Progressiva Cabelo Longo", duration: "4 a 5 horas", price: "R$ 180,00", icon: "💆‍♀️" },
    { id: 8, name: "Botox Capilar", duration: "2 a 3 horas", price: "R$ 80,00", icon: "✨" },
    { id: 9, name: "Cauterização + Escova", duration: "1h30", price: "R$ 70,00", icon: "🔥" },
    { id: 10, name: "Selagem", duration: "1h30", price: "R$ 80,00", icon: "🌟" },
    { id: 11, name: "Manicure", duration: "45 min", price: "R$ 30,00", icon: "💅" },
    { id: 12, name: "Pedicure", duration: "45 min", price: "R$ 30,00", icon: "🦶" },
    { id: 13, name: "Banho em Gel", duration: "1 hora", price: "R$ 50,00", icon: "✨" },
    { id: 14, name: "Maquiagem", duration: "1 hora", price: "R$ 75,00", icon: "💄" },
    { id: 15, name: "Outros Serviços", duration: null, price: null, icon: "📝", custom: true },
  ];

  const horarios = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00",
  ];

  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return {
      weekday: weekdays[date.getDay()],
      day: date.getDate(),
      month: months[date.getMonth()],
      formatted: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    };
  };

  const selectService = (id) => {
    setSelectedService(id);
    const service = services.find((s) => s.id === id);
    if (!service) return;

    if (!service.custom) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `${service.icon} ${service.name}`,
        text: `${service.price} • ${service.duration}`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleConfirm = () => {
    const service = services.find((s) => s.id === selectedService);
    if (!service) return;

    const dateObj = new Date(selectedDate + 'T00:00:00');
    const dateFormatted = formatDate(dateObj);

    let serviceDetails = service.custom 
      ? `<p style="margin: 10px 0;"><strong>📝 Descrição:</strong> ${customServiceText}</p>`
      : `
        <p style="margin: 10px 0;"><strong>💰 Valor:</strong> ${service.price}</p>
        <p style="margin: 10px 0;"><strong>⏱️ Duração:</strong> ${service.duration}</p>
      `;

    Swal.fire({
      icon: "success",
      title: "🎉 Agendamento Confirmado!",
      html: `
        <div style="text-align: left; padding: 20px;">
          <p style="margin: 10px 0;"><strong>👤 Cliente:</strong> ${clientName}</p>
          <p style="margin: 10px 0;"><strong>📱 Telefone:</strong> ${clientPhone}</p>
          <p style="margin: 10px 0;"><strong>${service.icon} Serviço:</strong> ${service.name}</p>
          ${serviceDetails}
          <p style="margin: 10px 0;"><strong>📅 Data:</strong> ${dateFormatted.formatted}</p>
          <p style="margin: 10px 0;"><strong>🕐 Horário:</strong> ${selectedTime}</p>
        </div>
        <hr style="margin: 20px 0; border-color: #f0f0f0;">
        <p style="color: #666; font-size: 14px;">Entraremos em contato para confirmar!</p>
      `,
      confirmButtonColor: "#ec4899",
      confirmButtonText: "Fechar",
      width: "600px",
    });

    // Reset após confirmação
    setStep(1);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
    setClientName("");
    setClientPhone("");
    setCustomServiceText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            onClick={() => {
              setStep(1);
              setSelectedService(null);
              setSelectedDate("");
              setSelectedTime("");
              setClientName("");
              setClientPhone("");
              setCustomServiceText("");
            }}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <Scissors className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Studio de Beleza CR</h1>
              <p className="text-pink-100 text-sm">Agende seu horário de forma rápida e prática</p>
            </div>
          </Link>

          <div className="flex gap-3">
            <a
              href="https://wa.me/5534997354857"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 transition-all p-3 rounded-full"
              title="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/studio_de_beleza_cr/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 transition-all p-3 rounded-full"
              title="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      {/* PROGRESS STEPS */}
      <div className="max-w-4xl mx-auto mt-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <span className="text-sm font-medium hidden sm:inline">Serviço</span>
          </div>
          <div className={`flex-1 h-1 mx-2 transition-all ${step >= 2 ? 'bg-pink-500' : 'bg-gray-200'}`}></div>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 2 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">Data/Hora</span>
          </div>
          <div className={`flex-1 h-1 mx-2 transition-all ${step >= 3 ? 'bg-pink-500' : 'bg-gray-200'}`}></div>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 3 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
            <span className="text-sm font-medium hidden sm:inline">Dados</span>
          </div>
        </div>
      </div>

      {/* STEP 1 */}
      <main className="max-w-4xl mx-auto p-6">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Escolha o Serviço</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((s) => (
                <div
                  key={s.id}
                  onClick={() => selectService(s.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer hover:scale-105 transition-all ${
                    selectedService === s.id
                      ? "border-pink-500 bg-pink-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-pink-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{s.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{s.name}</h3>
                        {s.duration && (
                          <p className="text-sm text-gray-600">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {s.duration}
                          </p>
                        )}
                        {s.custom && (
                          <p className="text-sm text-gray-500 italic">Descreva o que deseja</p>
                        )}
                      </div>
                    </div>
                    <span className="text-pink-600 font-bold text-lg">
                      {s.price || "A combinar"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Campo de descrição para "Outros Serviços" */}
            {services.find(s => s.id === selectedService)?.custom && (
              <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
                <label className="block text-gray-700 font-semibold mb-2">
                  📝 Descreva o serviço desejado
                </label>
                <textarea
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                  placeholder="Ex: luzes + corte, penteado para festa, design de sobrancelha..."
                  rows={4}
                  value={customServiceText}
                  onChange={(e) => setCustomServiceText(e.target.value)}
                />
              </div>
            )}

            <button
              disabled={!selectedService || (services.find(s => s.id === selectedService)?.custom && !customServiceText.trim())}
              onClick={() => setStep(2)}
              className="mt-8 w-full bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              Continuar
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Escolha Data e Horário</h2>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Selecione o Dia
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                {getNextDays().map((d) => {
                  const formatted = formatDate(d);
                  const dateStr = d.toISOString().split("T")[0];
                  return (
                    <div
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all hover:scale-105 ${
                        selectedDate === dateStr
                          ? "border-pink-500 bg-pink-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-pink-300"
                      }`}
                    >
                      <div className="text-xs text-gray-600 font-medium">{formatted.weekday}</div>
                      <div className="text-2xl font-bold text-gray-800 my-1">{formatted.day}</div>
                      <div className="text-xs text-gray-500">{formatted.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedDate && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Selecione o Horário
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {horarios.map((h) => (
                    <button
                      key={h}
                      onClick={() => setSelectedTime(h)}
                      className={`p-3 rounded-lg border-2 cursor-pointer text-center font-semibold transition-all hover:scale-105 ${
                        selectedTime === h
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-gray-200 bg-white hover:border-pink-300"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
              >
                Voltar
              </button>
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="flex-1 bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Seus Dados</h2>

            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                  placeholder="Digite seu nome"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                  placeholder="(00) 00000-0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 shadow-md mb-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" />
                Resumo do Agendamento
              </h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Serviço:</strong> {services.find(s => s.id === selectedService)?.name}</p>
                {services.find(s => s.id === selectedService)?.custom ? (
                  <p><strong>Descrição:</strong> {customServiceText}</p>
                ) : (
                  <>
                    <p><strong>Valor:</strong> {services.find(s => s.id === selectedService)?.price}</p>
                    <p><strong>Duração:</strong> {services.find(s => s.id === selectedService)?.duration}</p>
                  </>
                )}
                <p><strong>Data:</strong> {selectedDate && formatDate(new Date(selectedDate + 'T00:00:00')).formatted}</p>
                <p><strong>Horário:</strong> {selectedTime}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
              >
                Voltar
              </button>
              <button
                disabled={!clientName || !clientPhone}
                onClick={handleConfirm}
                className="flex-1 bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                Confirmar Agendamento
              </button>
            </div>
          </>
        )}
      </main>

      {/* FOOTER - Instagram e WhatsApp */}
      <div className="max-w-4xl mx-auto mt-12 px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center shadow-xl">
            <Instagram className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Siga no Instagram</h3>
            <p className="text-pink-100 mb-6">Veja nossos trabalhos e novidades!</p>
            <a
              href="https://www.instagram.com/studio_de_beleza_cr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-pink-50 transition-all shadow-lg"
            >
              @studio_de_beleza_cr
            </a>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center shadow-xl">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Fale Conosco</h3>
            <p className="text-green-100 mb-6">Tire suas dúvidas pelo WhatsApp!</p>
            <a
              href="https://wa.me/5534997354857"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-all shadow-lg"
            >
              (34) 9 9735-4857
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}