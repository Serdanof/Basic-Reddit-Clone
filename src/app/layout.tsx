import { Inter } from "next/font/google";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import Loader from "@/app/_components/loader";
import { store } from "@/redux";
import { TRPCReactProvider } from "@/trpc/react";
import "@/styles/globals.css";
import StoreProvider from "@/providers/store-provider";

const inter = Inter({
  subsets: ["cyrillic"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CS Engineering Test Task",
  description: "Generated by Dustin Lee",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <TRPCReactProvider>
          <ClerkProvider>
            <ClerkLoading>
              <Loader />
            </ClerkLoading>

            <ClerkLoaded>
              <StoreProvider>
                {children}
              </StoreProvider>
            </ClerkLoaded>
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
