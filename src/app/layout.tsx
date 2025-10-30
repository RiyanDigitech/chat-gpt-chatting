// import "./globals.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactNode, useState } from "react";

// export default function RootLayout({ children }: { children: ReactNode }) {
//   const [client] = useState(() => new QueryClient());

//   return (
//     <html lang="en">
//       <body>
//         <QueryClientProvider client={client}>{children}</QueryClientProvider>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import { ClientProvider } from "@/components/ClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
