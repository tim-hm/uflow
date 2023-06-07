import {
  Box,
  Divider,
  Input,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  useColorScheme,
} from "@mui/joy"
import { Home as HomeIcon } from "@mui/icons-material"
import { useState } from "react"

export function Search() {
  const { setMode } = useColorScheme()
  const [value, setValue] = useState("")
  const [results, setResults] = useState<SearchResult[]>(defaultResults)

  window.electron.receiveTheme((theme) => {
    if (theme === "dark") {
      setMode("dark")
    } else {
      setMode("light")
    }
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    getSearchResults(value).then(setResults)
  }

  function handleSearchResultSubmit(result: SearchResult) {
    window.electron.invokeSearchResult(result)
  }

  return (
    <Box bgcolor={"whitesmoke"}>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          size="lg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="plain"
          placeholder="What do you want to get done?"
          sx={{
            "--Input-focusedHighlight": "unset",
          }}
        />
        <Divider />
        <List size="sm" variant="outlined">
          {results.map((result) => {
            return (
              <>
                <ListItem>
                  <ListItemButton
                    onClick={() => handleSearchResultSubmit(result)}
                  >
                    <ListItemDecorator>
                      <HomeIcon />
                    </ListItemDecorator>
                    {result.display}
                  </ListItemButton>
                </ListItem>
                <ListDivider />
              </>
            )
          })}
        </List>
      </form>
    </Box>
  )
}

export type SearchResult = {
  display: string
  extension: string
  primary: string
  context: string[]
}

async function getSearchResults(query: string): Promise<SearchResult[]> {
  return [
    {
      display: "Toggle Theme",
      extension: "desktopctl",
      primary: "command",
      context: [],
    },
  ]
}

const defaultResults: SearchResult[] = [
  {
    display: "Toggle Theme",
    extension: "desktopctl",
    primary: "command",
    context: [],
  },
  {
    display: "Mute",
    extension: "desktopctl",
    primary: "command",
    context: [],
  },
  {
    display: "Find files",
    extension: "desktopctl",
    primary: "command",
    context: [],
  },
]
