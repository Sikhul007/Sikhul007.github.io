"use client";

import React, { useState, useEffect } from "react";

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-panel py-8 text-center">
      <p className="font-mono text-xs text-muted">
        <span className="text-purple">©</span> {currentYear} Md. Sikhul Islam Shihab{" "}
        <span className="text-muted">·</span> built with Next.js{" "}
        <span className="text-muted">·</span>{" "}
        <span className="text-green">all systems operational</span>
      </p>
    </footer>
  );
};

export default Footer;
