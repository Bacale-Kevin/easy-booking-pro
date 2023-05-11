"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErroStateProps {
  error: Error;
}

const ErrorSate: React.FC<ErroStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Oupps : (" subtitle="Something went wrong! " />;
};

export default ErrorSate;
