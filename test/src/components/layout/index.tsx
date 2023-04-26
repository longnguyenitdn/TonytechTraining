import React, { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      layout
      {children}
    </div>
  );
}

export default Layout;
