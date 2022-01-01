// React
import React from 'react'

// Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles'

// local storage
import {ProfileContext} from './ProfileContextWrapper'


function ThemeWrapper(props) {
    
    // settings 
    const profile = React.useContext(ProfileContext)

    const mode = profile.settings.useDarkMode ? "dark" : "light"

    const cardBackground = profile.settings.useDarkMode ? "#212121" : "#bdbdbd"
    
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