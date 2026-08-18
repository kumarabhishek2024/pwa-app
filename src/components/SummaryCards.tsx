import {
  ListTodo,
  Clock3,
  CircleCheck,
} from "lucide-react";

import { useTheme } from "../context/useTheme";

interface SummaryCardsProps {
  total: number;
  pending: number;
  completed: number;
}

function SummaryCards({
  total,
  pending,
  completed,
}: SummaryCardsProps) {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const cards = [
    {
      title: "Total Tasks",
      count: total,
      icon: ListTodo,
      iconBg: isDark ? "bg-blue-500/10" : "bg-blue-50",
      iconColor: isDark ? "text-blue-400" : "text-blue-600",
      countColor: isDark ? "text-blue-400" : "text-blue-600",
    },
    {
      title: "Pending",
      count: pending,
      icon: Clock3,
      iconBg: isDark ? "bg-orange-500/10" : "bg-orange-50",
      iconColor: isDark ? "text-orange-400" : "text-orange-600",
      countColor: isDark ? "text-orange-400" : "text-orange-600",
    },
    {
      title: "Completed",
      count: completed,
      icon: CircleCheck,
      iconBg: isDark ? "bg-green-500/10" : "bg-green-50",
      iconColor: isDark ? "text-green-400" : "text-green-600",
      countColor: isDark ? "text-green-400" : "text-green-600",
    },
  ];

  return (
    <section
      className="
        grid
        grid-cols-3

        gap-3
        px-3

        sm:gap-3
        sm:px-4

        lg:gap-4
        lg:px-8
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              group
              min-w-0
              rounded-xl
              border

              px-0
              py-2

              shadow-sm
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-md

              sm:rounded-2xl
              sm:px-0.5
              sm:py-3

              lg:rounded-3xl
              lg:px-1
              lg:py-4

              ${
                isDark
                  ? `
                    border-slate-800
                    bg-slate-900
                    shadow-black/10
                    hover:border-slate-700
                  `
                  : `
                    border-slate-200
                    bg-white
                    hover:border-slate-300
                  `
              }
            `}
          >
            {/* ICON */}

            <div className="flex justify-center">
              <div
                className={`
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg

                  sm:h-10
                  sm:w-10
                  sm:rounded-xl

                  lg:h-11
                  lg:w-11

                  transition-transform
                  duration-200
                  group-hover:scale-105

                  ${card.iconBg}
                  ${card.iconColor}
                `}
              >
                <Icon
                  size={16}
                  strokeWidth={2.3}
                  className="
                    sm:h-[19px]
                    sm:w-[19px]

                    lg:h-[21px]
                    lg:w-[21px]
                  "
                />
              </div>
            </div>

            {/* COUNT */}

            <div
              className="
                mt-2
                flex
                justify-center

                sm:mt-3
              "
            >
              <span
                className={`
                  text-xl
                  font-bold
                  leading-none
                  tracking-tight

                  sm:text-2xl
                  lg:text-3xl

                  ${card.countColor}
                `}
              >
                {card.count}
              </span>
            </div>

            {/* TITLE */}

            <p
              className={`
                mt-1
                truncate
                text-center
                text-[11px]
                font-semibold
                leading-4

                sm:mt-2
                sm:text-xs

                lg:text-sm

                ${
                  isDark
                    ? "text-slate-300"
                    : "text-slate-600"
                }
              `}
            >
              {card.title}
            </p>
          </div>
        );
      })}
    </section>
  );
}

export default SummaryCards;