import { Box, Input } from "@mui/joy"
import * as React from "react"
import * as ReactDom from "react-dom"
import { CssVarsProvider } from "@mui/joy/styles"

function render() {
  ReactDom.render(
    <CssVarsProvider defaultMode="dark" disableNestedContext>
      <Box>
        <Input autoFocus size="lg" />
      </Box>
    </CssVarsProvider>,
    document.body
  )
}

render()

// @ts-ignore
window.electron.receiveTheme((theme) => {
  if (theme === "dark") {
    console.log("dark!!")
  } else {
    console.log("light!!")
  }
})
