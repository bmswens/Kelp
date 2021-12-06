// React
import React from 'react'

// Material UI
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import OutlinedInput from '@mui/material/OutlinedInput'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { CssBaseline } from '@mui/material'

// Material UI Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import HomeIcon from '@mui/icons-material/Home'

// custom
import { LocationContext } from '../context/LocationContextWrapper'
import Settings from './Settings'

function LeftButtonGroup(props) {

    const context = React.useContext(LocationContext)

    return (
        <ButtonGroup
            variant="contained"
            color="primary"
        >
            <Button
                aria-label="back button"
                onClick={() => {
                    context.goBack()
                }}
                disabled={context.history.length === 0}
            >
                <ArrowBackIosNewIcon
                    fontSize="small"

                />
            </Button>
            <Button
                aria-label="home button"
                onClick={() => {
                    context.updateLocation('/')
                }}
            >
                <HomeIcon
                    fontSize="small"
                />
            </Button>
        </ButtonGroup>
    )
}

function LocationBar(props) {

    const theme = useTheme()

    const context = React.useContext(LocationContext)
    const [ inputContent, setInputContent ] = React.useState(context.currentLocation)

    // update on context change
    React.useEffect(function() {
        setInputContent(context.currentLocation)
    }, [context])

    // shortcuts
    const selfRef = React.useRef(null)

    function handleShortcuts(event) {
        let isValidToContinue = 
            selfRef.current !== null &&
            document.activeElement !== selfRef.current && 
            event.key === "/" &&
            (event.ctrlKey || event.altKey)

        if (isValidToContinue) {
            event.preventDefault()
            selfRef.current.focus()
            if (event.altKey) {
                setInputContent('/')
            }
        }
    }

    document.addEventListener('keydown', handleShortcuts)

    return (
        <OutlinedInput
            inputProps={{ ref: selfRef }}
            size="small"
            value={inputContent}
            sx={{
                width: "33vw",
                marginLeft: theme.spacing(1)
            }}
            role="searchbox"
            aria-label="search"
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="go to button"
                        onClick={() => {
                            context.updateLocation(inputContent)
                        }}
                        edge="end"
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </InputAdornment>
            }
            onChange={(event) => {
                setInputContent(event.target.value)
            }}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    context.updateLocation(inputContent)
                }
            }}
        />
    )
}


function TopNav(props) {

    const theme = useTheme()

    return (
        <Box
            sx={{ flexGrow: 1 }}
        >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <LeftButtonGroup />
                    <LocationBar />
                    <Box
                        sx={{ flexGrow: 1 }}
                    />
                    <Settings />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopNav
export {
    LocationContext
}