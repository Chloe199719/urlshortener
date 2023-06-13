"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
type Props = {
  children?: ReactNode;
};
export const queryClient = new QueryClient();
function QueryWarper({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
export default QueryWarper;
