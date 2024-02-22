import clsx from "clsx";

export default function CalendarCard ({ className, children }) {
  return (
    <div className={clsx("bg-white drop-shadow-xl border border-black", className)}>
      {children}
    </div>
  );
};
