// React
import React from 'react'

// Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles'

// local storage
import useLocalStorage from '@rehooks/local-storage'
import { defaultSettings } from '../dialogs/SettingsDialog'


function ThemeWrapper(props) {
    
    // settings
    const [settings] = useLocalStorage("settings", defaultSettings)

    const mode = settings.useDarkMode ? "dark" : "light"

    const cardBackground = settings.useDarkMode ? "#212121" : "#bdbdbd"
    
    const theme = createTheme({
        palette: {
            mode: mode,
            palette: {
                background: {
                    card: cardBackground
                }
            }
        },
    })

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
  )
}

export default ThemeWrapper