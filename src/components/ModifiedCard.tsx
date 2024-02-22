//same as card but without the x padding

import clsx from "clsx";

export default function ModifiedCard ({ className, children }) {
  return (
    <div className={clsx("rounded-3xl py-4 drop-shadow-xl bg-white", className)}>
      {children}
    </div>
  );
};
