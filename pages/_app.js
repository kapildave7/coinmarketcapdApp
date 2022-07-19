import "../styles/globals.css";
import Navbar from "../components/navbar";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Navbar></Navbar>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
