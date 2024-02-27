import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import SplashScreen from "@/app/_components/splash-screen";
import StoreProvider from "@/providers/store-provider";
import AuthProvider from "@/providers/auth-provider";
import SidebarProvider from "@/providers/sidebar-provider";
import { TRPCReactProvider } from "@/trpc/react";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
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
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <ClerkProvider>
            <ClerkLoading>
              <SplashScreen />
            </ClerkLoading>

            <ClerkLoaded>
              <StoreProvider>
                <AuthProvider>
                  <SidebarProvider>
                    {children}
                    <Toaster position="top-right" />
                  </SidebarProvider>
                </AuthProvider>
              </StoreProvider>
            </ClerkLoaded>
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
