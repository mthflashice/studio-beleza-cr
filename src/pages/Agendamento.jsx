import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Scissors,
  Instagram,
  MessageCircle,
  Calendar,
  Clock,
  User,
  Phone,
  Check
} from "lucide-react";

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

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
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return { formatted: "" };
    const date = new Date(dateStr + "T00:00:00");
    return {
      formatted: date.toLocaleDateString('pt-BR'),
      weekday: date.toLocaleDateString('pt-BR', { weekday: 'short' })
    };
  };

  const handleConfirm = () => {
    const service = services.find(s => s.id === selectedService);
    const dateInfo = formatDate(selectedDate);

    const message = `Olá! Gostaria de confirmar meu agendamento 💖\n\n👤 Nome: ${clientName}\n📱 Telefone: ${clientPhone}\n✂️ Serviço: ${service.name}\n💰 Valor: ${service.price}\n⏱️ Duração: ${service.duration}\n📅 Data: ${dateInfo.formatted}\n🕐 Horário: ${selectedTime}\n\nAguardo confirmação 😊`;

    const phone = "5534997354857";
    
    // Alerta de Sucesso
    Swal.fire({
      icon: "success",
      title: "🎉 Agendamento Confirmado!",
      text: "Você será redirecionado para o WhatsApp para finalizar.",
      confirmButtonColor: "#ec4899",
    }).then(() => {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
      // Reset State
      setStep(1);
      setSelectedService(null);
      setSelectedDate("");
      setSelectedTime("");
      setClientName("");
      setClientPhone("");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pb-10">
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Scissors className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Studio de Beleza CR</h1>
              <p className="text-pink-100 text-xs">Beleza e Autocuidado</p>
            </div>
          </Link>
          <div className="flex gap-3">
            <Instagram className="cursor-pointer hover:scale-110 transition-transform" />
            <MessageCircle className="cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-10 px-4">
        {/* Renderização condicional baseada no Step */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => { setSelectedService(s.id); setStep(2); }}
                className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${selectedService === s.id ? 'border-pink-500 bg-pink-50' : 'border-gray-100 bg-white hover:border-pink-200'}`}
              >
                <span className="text-3xl">{s.icon}</span>
                <div className="text-left">
                  <p className="font-bold text-gray-800">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.price} • {s.duration}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Calendar className="text-pink-500"/> Escolha a Data</h2>
            <div className="flex gap-2 overflow-x-auto pb-4">
              {getNextDays().map((date, idx) => {
                const dateStr = date.toISOString().split('T')[0];
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all ${selectedDate === dateStr ? 'bg-pink-500 text-white border-pink-500' : 'bg-white border-gray-100'}`}
                  >
                    <p className="text-xs uppercase">{date.toLocaleDateString('pt-BR', { weekday: 'short' })}</p>
                    <p className="text-lg font-bold">{date.getDate()}</p>
                  </button>
                );
              })}
            </div>

            <h2 className="text-xl font-bold mt-6 mb-4 flex items-center gap-2"><Clock className="text-pink-500"/> Horários Disponíveis</h2>
            <div className="grid grid-cols-4 gap-2">
              {horarios.map(hora => (
                <button
                  key={hora}
                  onClick={() => setSelectedTime(hora)}
                  className={`p-2 rounded-lg border text-sm transition-all ${selectedTime === hora ? 'bg-pink-500 text-white' : 'hover:bg-pink-50'}`}
                >
                  {hora}
                </button>
              ))}
            </div>
            <button 
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(3)}
              className="w-full mt-8 bg-pink-500 text-white py-3 rounded-xl font-bold disabled:opacity-50"
            >
              Próximo Passo
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-6">Informações de Contato</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Maria Silva"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input 
                  type="tel" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="(34) 99999-9999"
                />
              </div>
              <button 
                onClick={handleConfirm}
                disabled={!clientName || !clientPhone}
                className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Check /> Confirmar Agendamento
              </button>
              <button onClick={() => setStep(2)} className="w-full text-gray-500 text-sm">Voltar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
