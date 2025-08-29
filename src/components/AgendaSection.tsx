"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AgendaItem {
  id: number;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  participants: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export default function AgendaSection() {
	const [currentAgendaDate, setCurrentAgendaDate] = useState(new Date());
	const [agenda, setAgenda] = useState<AgendaItem[]>([]);
	const [loading, setLoading] = useState(true);

	const agendaMonthNames = [
		'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
		'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
	];

	useEffect(() => {
		fetchAgenda();
	}, [currentAgendaDate]);

	const fetchAgenda = async () => {
		setLoading(true);
		try {
			const currentMonth = currentAgendaDate.getMonth() + 1;
			const currentYear = currentAgendaDate.getFullYear();
			
			// Fetch agenda for current month
			const response = await fetch(`/api/agenda?page=1&limit=50&month=${currentMonth}&year=${currentYear}`);
			const data = await response.json();

			if (data.success) {
				setAgenda(data.data.agenda);
			} else {
				console.error('Error fetching agenda:', data.error);
				setAgenda([]);
			}
		} catch (error) {
			console.error('Error fetching agenda:', error);
			setAgenda([]);
		} finally {
			setLoading(false);
		}
	};

	const navigateAgendaMonth = (direction: 'prev' | 'next') => {
		const newDate = new Date(currentAgendaDate);
		newDate.setMonth(currentAgendaDate.getMonth() + (direction === 'next' ? 1 : -1));
		setCurrentAgendaDate(newDate);
	};

	const currentMonth = currentAgendaDate.getMonth();
	const currentYear = currentAgendaDate.getFullYear();

	const generateDays = () => {
		const firstDay = new Date(currentYear, currentMonth, 1).getDay();
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		return [
			...Array(firstDay).fill(null),
			...Array.from({ length: daysInMonth }, (_, i) => i + 1)
		];
	};

	// Get agenda events for current month
	const getAgendaForMonth = () => {
		return agenda.filter(item => {
			const startDate = new Date(item.startDate);
			return startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear;
		});
	};

	// Get days that have agenda
	const getEventDates = () => {
		return getAgendaForMonth().map(item => new Date(item.startDate).getDate());
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'UPCOMING': return 'green';
			case 'ONGOING': return 'blue';
			case 'COMPLETED': return 'gray';
			case 'CANCELLED': return 'red';
			default: return 'gray';
		}
	};

	const days = generateDays();
	const eventDates = getEventDates();
	const monthAgenda = getAgendaForMonth();

	const isToday = (day: number) => {
		const today = new Date();
		return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
	};

	return (
		<div className="max-w-6xl mx-auto px-4 mb-16">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
					Agenda Kegiatan
				</h2>
				<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					Jadwal kegiatan, acara, dan program lingkungan hidup di Kota Tasikmalaya
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8">
				{/* Kalender */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
					<div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex justify-between items-center">
						<h3 className="text-lg font-bold text-white">
							{agendaMonthNames[currentMonth]} {currentYear}
						</h3>
						<div className="inline-flex gap-0">
							<button onClick={() => navigateAgendaMonth("prev")} className="text-green-600 bg-white rounded-l-md hover:scale-110 transition px-3 flex items-center justify-center">
							<ChevronLeft size={20} />
							</button>
							<button onClick={() => setCurrentAgendaDate(new Date())} className="text-green-600 bg-white hover:scale-110 transition px-3 font-semibold">
							Hari Ini
							</button>
							<button onClick={() => navigateAgendaMonth("next")} className="text-green-600 bg-white rounded-r-md hover:scale-110 transition px-3 flex items-center justify-center">
							<ChevronRight size={20} />
							</button>
						</div>
					</div>
					<div className="p-6">
						<div className="grid grid-cols-7 gap-1 text-center mb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
							{["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => <div key={d}>{d}</div>)}
						</div>
						<div className="grid grid-cols-7 gap-1 text-center">
							{days.map((day, idx) =>
								day === null ? (
									<div key={idx}></div>
								) : (
									<div
										key={idx}
										className={`p-2 rounded cursor-pointer text-sm ${
											isToday(day)
												? "bg-blue-500 text-white font-bold shadow"
												: eventDates.includes(day)
												? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-semibold"
												: "text-gray-700 dark:text-gray-300"
										}`}
									>
										{day}
									</div>
								)
							)}
						</div>
					</div>
				</div>

				{/* Agenda Ringkas */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
					<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
						<h3 className="text-lg text-center font-bold text-white">Agenda {agendaMonthNames[currentMonth]} {currentYear}</h3>
					</div>
					<div className="p-6">
						{loading ? (
							<div className="space-y-4">
								{Array.from({ length: 4 }).map((_, index) => (
									<div key={index} className="animate-pulse flex items-start">
										<div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mr-2 mt-1"></div>
										<div className="flex-1">
											<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
											<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
										</div>
									</div>
								))}
							</div>
						) : monthAgenda.length > 0 ? (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								{monthAgenda.slice(0, 6).map((event) => {
									const statusColor = getStatusColor(event.status);
									const eventDate = new Date(event.startDate).getDate();
									
									return (
										<div key={event.id} className="flex items-start text-sm group">
											<div className={`w-2 h-2 rounded-full mr-2 ${
												statusColor === "green" ? "bg-green-600 mt-1" :
												statusColor === "blue" ? "bg-blue-600 mt-1" :
												statusColor === "gray" ? "bg-gray-600 mt-1" : 
												statusColor === "red" ? "bg-red-600 mt-1" : "bg-gray-400"
											}`}></div>
											<div className="flex-1">
												<a 
													href={`/informasi/agenda/${event.id}`}
													className={`font-medium ${
														statusColor === "green" ? "text-green-600" : 
														statusColor === "blue" ? "text-blue-600" : 
														statusColor === "gray" ? "text-gray-600" :
														statusColor === "red" ? "text-red-600" : "text-gray-800"
													} dark:text-gray-200 hover:underline`}
												>
													{event.title}
												</a>
												<p className="text-xs font-semibold mb-1 text-gray-600 dark:text-blue-400">
													{event.location}
												</p>
												<p className="text-xs text-gray-500 dark:text-gray-300">
													Tanggal {eventDate} • {event.startTime.slice(0, 5)} WIB
												</p>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
								Tidak ada agenda bulan ini.
							</p>
						)}
						
						{/* Link ke halaman agenda lengkap */}
						{monthAgenda.length > 0 && (
							<div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 text-center items-end">
								<a 
									href="/informasi/agenda" 
									className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium text-sm inline-flex items-center"
								>
									Lihat Semua Agenda
									<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
