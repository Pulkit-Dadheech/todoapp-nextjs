import { ContextProvider } from "@/components/Clients";
import "../../styles/app.scss";
import Header from "./header";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
        <>
        <Header/>
        {children}
        </>
        </ContextProvider>
      </body>
    </html>
  );
}
