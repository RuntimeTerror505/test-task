import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
    
      <div className="h-screen w-full px-10 lg:px-28">{children}</div>
  );

export default Layout;
