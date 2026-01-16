import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  Calendar,
  Clock,
  Scissors,
  User,
  Phone,
  Check,
  Instagram,
  MessageCircle,
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const services = [
    { id: 1, name: 'Corte Feminino', duration: '1 hora', price: 'R$ 60,00', icon: '✂️' },
    { id: 2, name: 'Progressiva', duration: '2 a 3 horas', price: 'R$ 250,00', icon: '💆‍♀️' },
    { id: 3, name: 'Botox', duration: '2 a 3 horas', price: 'R$ 200,00', icon: '✨' },
    { id: 4, name: 'Make Média', duration: '1h30', price: 'R$ 120,00', icon: '💄' },
    { id: 5, name: 'Luzes/Mechas', duration: '1 a 2 horas', price: 'R$ 180,00', icon: '🌟' },
    { id: 6, name: 'Escova', duration: '30 min', price: 'R$ 40,00', icon: '💨' },
    { id: 7, name: 'Hidratação', duration: '1 hora', price: 'R$ 80,00', icon: '💧' },
    { id: 8, name: 'Coloração', duration: '1h30 a 2h', price: 'R$ 150,00', icon: '🎨' },
    { id: 9, name: 'Ombré Hair', duration: '2 a 3 horas', price: 'R$ 220,00', icon: '🌈' },
    { id: 10, name: 'Reflexo', duration: '1 hora', price: 'R$ 100,00', icon: '✨' },
    { id: 11, name: 'Cauterização', duration: '1h30', price: 'R$ 120,00', icon: '🔥' },
    { id: 12, name: 'Penteado', duration: '1 hora', price: 'R$ 100,00', icon: '👑' },
    { id: 13, name: 'Sobrancelha (Design)', duration: '30 min', price: 'R$ 30,00', icon: '👁️' },
  ];

  const horarios = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '13:00','13:30','14:00','14:30','15:00','15:30',
    '16:00','16:30','17:00','17:30','18:00'
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
    const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    return `${date.getDate()}/${months[date.getMonth()]}/${date.getFullYear()}`;
  };

  const selectService = (id) => {
    setSelectedService(id);
    const service = services.find(s => s.id === id);
    if (!service) return;

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${service.icon} ${service.name}`,
      text: `${service.price} • ${service.duration}`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleConfirm = () => {
    const service = services.find(s => s.id === selectedService);
    if (!service) return;

    Swal.fire({
      icon: 'success',
      title: 'Agendamento confirmado!',
      html: `
        <b>${service.name}</b><br/>
        ${formatDate(new Date(selectedDate))} às ${selectedTime}<br/>
        ${clientName} • ${clientPhone}
      `,
      confirmButtonColor: '#ec4899',
    });

    setStep(1);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setClientName('');
    setClientPhone('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Scissors />
            <h1 className="text-3xl font-bold">Studio de Beleza CR</h1>
          </div>
          <div className="flex gap-3">
            <a href="https://wa.me/5534997354857" target="_blank"><MessageCircle /></a>
            <a href="https://www.instagram.com/studio_de_beleza_cr/" target="_blank"><Instagram /></a>
          </div>
        </div>
      </header>

      {/* STEP 1 */}
      <main className="max-w-4xl mx-auto p-6">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Escolha o Serviço</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map(s => (
                <div
                  key={s.id}
                  onClick={() => selectService(s.id)}
                  className={`p-5 rounded-xl border cursor-pointer hover:scale-105 transition ${
                    selectedService === s.id ? 'border-pink-500 bg-pink-50' : 'bg-white'
                  }`}
                >
                  <strong>{s.icon} {s.name}</strong>
                  <p className="text-sm">{s.duration}</p>
                  <p className="text-pink-600 font-bold">{s.price}</p>
                </div>
              ))}
            </div>

            <button
              disabled={!selectedService}
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-pink-500 text-white py-3 rounded-xl font-bold disabled:bg-gray-300"
            >
              Continuar
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Escolha Data e Horário</h2>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {getNextDays().map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d.toISOString().split('T')[0])}
                  className={`p-3 rounded ${selectedDate === d.toISOString().split('T')[0] ? 'bg-pink-500 text-white' : 'bg-white'}`}
                >
                  {formatDate(d)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {horarios.map(h => (
                <button
                  key={h}
                  onClick={() => setSelectedTime(h)}
                  className={`p-2 rounded ${selectedTime === h ? 'bg-pink-500 text-white' : 'bg-white'}`}
                >
                  {h}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(3)}
              className="mt-6 w-full bg-pink-500 text-white py-3 rounded-xl font-bold disabled:bg-gray-300"
            >
              Continuar
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Seus Dados</h2>
            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="Nome"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
            />
            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="Telefone"
              value={clientPhone}
              onChange={e => setClientPhone(e.target.value)}
            />

            <button
              disabled={!clientName || !clientPhone}
              onClick={handleConfirm}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold disabled:bg-gray-300"
            >
              Confirmar Agendamento
            </button>
          </>
        )}
      </main>
    </div>
  );
}
