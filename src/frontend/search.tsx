import { Box, Input, useColorScheme } from "@mui/joy"

export function Search() {
  const { setMode } = useColorScheme()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.electron.receiveTheme((theme) => {
    if (theme === "dark") {
      setMode("dark")
    } else {
      setMode("light")
    }
  })

  return (
    <Box>
      <Input autoFocus size="lg" />
    </Box>
  )
}
