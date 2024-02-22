//this is actually blue, not dark lol
import clsx from "clsx";

export default function DarkModifiedCard ({ className, children }) {
  return (
    <div className={clsx("rounded-3xl drop-shadow-xl bg-blue-400", className)}>
      {children}
    </div>
  );
};
