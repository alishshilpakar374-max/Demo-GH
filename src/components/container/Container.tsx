import type { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <div className="mb-10">{children}</div>;
}

export default Container;
