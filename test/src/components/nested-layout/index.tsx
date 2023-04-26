import React, { PropsWithChildren } from "react";

function NestedLayout({ children }: PropsWithChildren) {
  return (
    <div>
      nested-layout
      {children}
    </div>
  );
}

export default NestedLayout;
