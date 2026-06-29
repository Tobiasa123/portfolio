// @ts-ignore: CSS module import for global stylesheet
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Portfolio",
  description: "My personal site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
