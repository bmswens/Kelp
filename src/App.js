// React
import React from 'react'

// Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Custom
import LocationContextWrapper from './nav/LocationContextWrapper'
import TopNav from './nav/TopNav'
import SideDrawer from './nav/SideDrawer'
import FileExplorer from './content/FileExplorer'


function App() {
  // Theme from system
  const wantsLight = window.matchMedia('(prefers-color-scheme: light').matches
  let mode = 'dark'
  if (wantsLight) {
    mode = 'light'
  }
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  })

  return (
    <LocationContextWrapper>
      <ThemeProvider theme={theme}>
        <TopNav />
        <SideDrawer />
        <FileExplorer />
      </ThemeProvider>
    </LocationContextWrapper>
  );
}

export default App;
