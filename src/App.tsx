import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Router } from "./components/Router.tsx";
import { CyclesContextProvider } from "./contexts/CyclesContext.tsx";
import { GlobalStyle } from "./styles/global.ts";
import { defaultTheme } from "./styles/themes/detault.ts";


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}