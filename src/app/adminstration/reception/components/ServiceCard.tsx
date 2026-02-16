"use client";

import Card from "@/app/components/Card";

interface ServiceCardProps {
  title: string;
  icon: string;
  count: number;
  onClick: () => void;
  isActive: boolean;
}

export default function ServiceCard({
  title,
  icon,
  count,
  onClick,
  isActive,
}: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="w-full"
    >
      <Card
        className={`p-6 cursor-pointer transition-all border ${
          isActive
            ? "border-blue-500 bg-blue-50 shadow-lg"
            : "border-gray-200 hover:shadow-md hover:border-blue-300"
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{icon}</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">
              <span className="text-2xl font-bold text-blue-600">{count}</span>{" "}
              today
            </p>
          </div>
          <div className="text-3xl text-gray-300">→</div>
        </div>
      </Card>
    </div>
  );
}