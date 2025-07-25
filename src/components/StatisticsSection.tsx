import React from "react";

export interface StatisticsItem {
  value: string;
  label: string;
}

export interface StatisticsSectionProps {
  title?: string;
  subtitle?: string;
  items: StatisticsItem[];
  gradientClass?: string;
}

export default function StatisticsSection({
  title = "Pencapaian Kinerja 2025",
  subtitle = "Komitmen nyata untuk lingkungan berkelanjutan",
  items,
  gradientClass = "bg-gradient-to-r from-green-600 to-blue-600"
}: StatisticsSectionProps) {
  return (
    <section className="mb-12">
      <div className={`${gradientClass} rounded-2xl text-white p-8`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-90">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {items.map((item, idx) => (
            <div key={idx}>
              <div className="text-2xl font-bold mb-2">{item.value}</div>
              <div className="text-lg opacity-90">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
