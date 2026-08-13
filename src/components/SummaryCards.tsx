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

const SummaryCards = ({
  total,
  pending,
  completed,
}: SummaryCardsProps) => {

  return (
    <section className="grid grid-cols-3 gap-3 px-5 lg:gap-6 lg:px-10">

      {/* Total */}
      <div className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md lg:p-6">

        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">

          <ListTodo
            size={21}
            className="text-blue-600"
          />

        </div>

        <h3 className="text-2xl font-extrabold text-blue-600">
          {total}
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
          Total Tasks
        </p>

      </div>

      {/* Pending */}
      <div className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md lg:p-6">

        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">

          <Clock3
            size={21}
            className="text-red-600"
          />

        </div>

        <h3 className="text-2xl font-extrabold text-red-600">
          {pending}
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
          Pending
        </p>

      </div>

      {/* Completed */}
      <div className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md lg:p-6">

        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">

          <CircleCheck
            size={21}
            className="text-green-600"
          />

        </div>

        <h3 className="text-2xl font-extrabold text-green-600">
          {completed}
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
          Completed
        </p>

      </div>

    </section>
  );
};

export default SummaryCards;