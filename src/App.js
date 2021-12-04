// React
import React from 'react'

// Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Custom
import ContextWrappers from './context/ContextWrappers'
import TopNav from './nav/TopNav'
import SideDrawer from './nav/SideDrawer'
import FileExplorer from './content/FileExplorer'
import DragAndDropHandler from './content/DragAndDropHandler'


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
    <ContextWrappers>
      <ThemeProvider theme={theme}>
        <TopNav />
        <SideDrawer />
        <FileExplorer />
        <DragAndDropHandler />
      </ThemeProvider>
    </ContextWrappers>
  );
}

export default App;
