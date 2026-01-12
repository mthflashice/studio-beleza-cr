import React, { useState } from 'react';
import { Calendar, Clock, Scissors, User, Phone, Check, Instagram, MessageCircle } from 'lucide-react';

export default function AgendamentoSalao() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const services = [
    { id: 1, name: 'Corte Feminino', duration: '45 min', price: 'R$ 60,00' },
    { id: 2, name: 'Escova', duration: '30 min', price: 'R$ 40,00' },
    { id: 3, name: 'Progressiva', duration: '3-4 horas', price: 'R$ 250,00' },
    { id: 4, name: 'Hidratação', duration: '1 hora', price: 'R$ 80,00' },
    { id: 5, name: 'Coloração', duration: '2 horas', price: 'R$ 150,00' },
    { id: 6, name: 'Luzes/Mechas', duration: '3 horas', price: 'R$ 200,00' },
    { id: 7, name: 'Penteado', duration: '1 hora', price: 'R$ 100,00' },
    { id: 8, name: 'Manicure', duration: '45 min', price: 'R$ 35,00' },
  ];

  const horarios = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
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
    return {
      weekday: weekdays[date.getDay()],
      day: date.getDate(),
      month: date.getMonth() + 1,
      full: date.toISOString().split('T')[0]
    };
  };

  const handleConfirm = () => {
    const service = services.find(s => s.id === selectedService);
    alert(`Agendamento confirmado!\n\nCliente: ${clientName}\nTelefone: ${clientPhone}\nServiço: ${service.name}\nData: ${selectedDate}\nHorário: ${selectedTime}\n\nEntraremos em contato para confirmar!`);
    // Reset
    setStep(1);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setClientName('');
    setClientPhone('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Scissors className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Studio de Beleza CR</h1>
              </div>
              <p className="text-pink-100">Agende seu horário de forma rápida e prática</p>
            </div>
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
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <span className="text-sm font-medium hidden sm:inline">Serviço</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-pink-500' : 'bg-gray-200'}`}></div>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">Data/Hora</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-pink-500' : 'bg-gray-200'}`}></div>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
            <span className="text-sm font-medium hidden sm:inline">Dados</span>
          </div>
        </div>

        {/* Step 1: Escolher Serviço */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Escolha o Serviço</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-pink-500 bg-pink-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{service.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {service.duration}
                      </p>
                    </div>
                    <span className="text-pink-600 font-bold text-lg">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => selectedService && setStep(2)}
              disabled={!selectedService}
              className="mt-8 w-full bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 2: Escolher Data e Hora */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Escolha Data e Horário</h2>
            
            {/* Datas */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Selecione o Dia
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                {getNextDays().map((date) => {
                  const formatted = formatDate(date);
                  return (
                    <div
                      key={formatted.full}
                      onClick={() => setSelectedDate(formatted.full)}
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        selectedDate === formatted.full
                          ? 'border-pink-500 bg-pink-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-pink-300'
                      }`}
                    >
                      <div className="text-xs text-gray-600 font-medium">{formatted.weekday}</div>
                      <div className="text-2xl font-bold text-gray-800 my-1">{formatted.day}</div>
                      <div className="text-xs text-gray-500">{formatted.month.toString().padStart(2, '0')}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Horários */}
            {selectedDate && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Selecione o Horário
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {horarios.map((time) => (
                    <div
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 cursor-pointer text-center font-semibold transition-all ${
                        selectedTime === time
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 bg-white hover:border-pink-300 text-gray-700'
                      }`}
                    >
                      {time}
                    </div>
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
                onClick={() => selectedDate && selectedTime && setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Dados do Cliente */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Seus Dados</h2>
            
            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            {/* Resumo */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 shadow-md mb-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" />
                Resumo do Agendamento
              </h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Serviço:</strong> {services.find(s => s.id === selectedService)?.name}</p>
                <p><strong>Valor:</strong> {services.find(s => s.id === selectedService)?.price}</p>
                <p><strong>Duração:</strong> {services.find(s => s.id === selectedService)?.duration}</p>
                <p><strong>Data:</strong> {selectedDate}</p>
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
                onClick={handleConfirm}
                disabled={!clientName || !clientPhone}
                className="flex-1 bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instagram Section */}
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