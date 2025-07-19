"use client";
import React, { useState } from "react";

export default function AgendaSection() {
	const [currentAgendaDate, setCurrentAgendaDate] = useState(new Date(2025, 6, 16)); // July 16, 2025

	const agendaMonthNames = [
		'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
		'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
	];

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


const agendaDates: { [key: string]: number[] } = {
	"2025-07": [15, 16, 22, 25, 28],
	"2025-08": [5, 12, 18, 24, 30],
	"2025-06": [8, 15, 20, 27],
	"2025-09": [3, 10, 17, 25]
};

type AgendaEvent = { date: number; title: string; color: string };
const agendaEvents: { [key: string]: AgendaEvent[] } = {
	"2025-07": [
		{ date: 15, title: "Pelatihan Bank Sampah", color: "green" },
		{ date: 16, title: "Cimahi Hepi Run 2025", color: "blue" },
		{ date: 22, title: "Workshop Kompos", color: "green" },
		{ date: 25, title: "Sosialisasi AMDAL", color: "blue" },
		{ date: 28, title: "Monitoring Air Sungai", color: "purple" }
	],
	"2025-08": [
		{ date: 5, title: "Pembersihan Pantai", color: "green" },
		{ date: 12, title: "Seminar Energi Terbarukan", color: "blue" },
		{ date: 18, title: "Penanaman Mangrove", color: "green" },
		{ date: 24, title: "Workshop Daur Ulang", color: "purple" },
		{ date: 30, title: "Monitoring Udara", color: "blue" }
	],
	"2025-06": [
		{ date: 8, title: "Hari Lingkungan Hidup", color: "green" },
		{ date: 15, title: "Sosialisasi UKL-UPL", color: "blue" },
		{ date: 20, title: "Bersih-bersih Sungai", color: "green" },
		{ date: 27, title: "Edukasi Sampah Plastik", color: "purple" }
	],
	"2025-09": [
		{ date: 3, title: "Kampanye Hemat Energi", color: "green" },
		{ date: 10, title: "Pameran Teknologi Hijau", color: "blue" },
		{ date: 17, title: "Workshop Biogas", color: "purple" },
		{ date: 25, title: "Gerakan Tanam Pohon", color: "green" }
	]
};

	const monthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
const days = generateDays();
const eventDates: number[] = agendaDates[monthKey] || [];
const events: AgendaEvent[] = agendaEvents[monthKey] || [];

	const isToday = (day: number) => {
		const today = new Date(2025, 6, 16);
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

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Kalender */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
					<div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex justify-between items-center">
						<h3 className="text-lg font-bold text-white">
							{agendaMonthNames[currentMonth]} {currentYear}
						</h3>
						<div className="flex gap-2">
							<button onClick={() => navigateAgendaMonth("prev")} className="text-white hover:scale-110 transition">
								←
							</button>
							<button onClick={() => navigateAgendaMonth("next")} className="text-white hover:scale-110 transition">
								→
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
						<h3 className="text-lg font-bold text-white">Agenda {agendaMonthNames[currentMonth]} {currentYear}</h3>
					</div>
					<div className="p-6 space-y-4">
			{events.length > 0 ? events.map((event: AgendaEvent, index: number) => (
				<div key={index} className="flex items-center text-sm">
					<div className={`w-2 h-2 rounded-full mr-2 ${
						event.color === "green" ? "bg-green-600" :
						event.color === "blue" ? "bg-blue-600" :
						event.color === "purple" ? "bg-purple-600" : "bg-gray-400"
					}`}></div>
					<div>
						<p className="font-medium text-gray-800 dark:text-white">{event.title}</p>
						<p className="text-xs text-gray-500 dark:text-gray-400">Tanggal {event.date}</p>
					</div>
				</div>
			)) : (
							<p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada agenda bulan ini.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
