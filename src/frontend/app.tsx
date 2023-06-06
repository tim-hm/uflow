import { CssVarsProvider } from "@mui/joy/styles"
import { theme } from "./theme"
import { Search } from "./search"

export function App() {
  return (
    <CssVarsProvider defaultMode="system" theme={theme} disableNestedContext>
      <Search />
    </CssVarsProvider>
  )
}
