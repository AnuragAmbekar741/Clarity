import { ThemeProvider } from "./components/theme/theme-providers";
import { LandingPage } from "./components/landing-page/LandingPage";
import "./global.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
