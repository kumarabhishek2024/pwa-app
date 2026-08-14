import {
  ListTodo,
  Clock3,
  CircleCheck,
} from "lucide-react";

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
  const cards = [
    {
      title: "Total Tasks",
      count: total,
      icon: ListTodo,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      countColor: "text-blue-600",
    },
    {
      title: "Pending",
      count: pending,
      icon: Clock3,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      countColor: "text-orange-600",
    },
    {
      title: "Completed",
      count: completed,
      icon: CircleCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      countColor: "text-green-600",
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-3 px-5 lg:gap-5 lg:px-10">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              group
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-md
              sm:p-5
              lg:rounded-3xl
              lg:p-6
            "
          >
            {/* ICON */}
            <div className="flex justify-center">
              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  ${card.iconBg}
                  ${card.iconColor}
                  transition-transform
                  duration-200
                  group-hover:scale-110
                  sm:h-11
                  sm:w-11
                `}
              >
                <Icon size={21} strokeWidth={2.2} />
              </div>
            </div>

            {/* COUNT */}
            <div className="mt-3 flex justify-center">
              <span
                className={`
                  text-3xl
                  font-extrabold
                  tracking-tight
                  ${card.countColor}
                  sm:text-4xl
                  lg:text-5xl
                `}
              >
                {card.count}
              </span>
            </div>

            {/* TITLE */}
           <p className="mt-2 text-center text-sm font-bold text-slate-600 sm:text-base lg:text-lg">
  {card.title}
</p>
          </div>
        );
      })}
    </section>
  );
}

export default SummaryCards;