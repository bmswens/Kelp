// React
import React from 'react'

// Material UI
import { FormLabel, Grid, IconButton, Switch, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

// Material UI Icons
import CloseIcon from '@mui/icons-material/Close'
import LoginIcon from '@mui/icons-material/Login'

// custom
import { ProfileContext } from '../context/ProfileContextWrapper'

const defaultSettings = {
    showDotFiles: true,
    useDetailsView: false,
    useDarkMode: true,
}


function ProfileSelector(props) {

    const profile = React.useContext(ProfileContext)
    const [input, setInput] = React.useState(profile.current)

    function handleSwitch() {
        if (profile.options.includes(input)) {
            profile.switchProfile(input)
        }
        else {
            profile.makeNewProfile(input)
        }
    }


    return (
        <React.Fragment>
            <Grid item xs={9}>
                <Autocomplete
                    fullWidth
                    freeSolo
                    inputValue={input}
                    onInputChange={(event, newValue) => setInput(newValue)}
                    options={profile.options}
                    renderInput={(params) => <TextField {...params} label="Profile" inputProps={{...params.inputProps, "aria-label": "select profile"}} />}
                />
            </Grid>
            <Grid item xs={3}>
                <Box
                    sx={{ display: "flex", flexDirection: "row-reverse" }}
                >
                    <IconButton
                        aria-label="switch profiles"
                        onClick={handleSwitch}
                    >
                        <LoginIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Grid>
        </React.Fragment>

    )
}


function SettingsDialog(props) {

    const { open, close } = props

    const profile = React.useContext(ProfileContext)

    function updateSettings(setting, value) {
        profile.updateSetting(setting, value)
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth
        >
            <DialogTitle variant="h4">
                Settings
                <IconButton
                    onClick={close}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon fontSize="large" />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={1}>
                    <ProfileSelector />
                    <Grid item xs={6}>
                        <FormLabel>
                            <Typography variant="h5">
                                Dark Mode
                            </Typography>
                        </FormLabel>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Switch
                            inputProps={{
                                "aria-label": "use dark mode"
                            }}
                            checked={profile.settings.useDarkMode}
                            onChange={(event) => {
                                updateSettings("useDarkMode", event.target.checked)
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel>
                            <Typography variant="h5">
                                Show Dotfiles
                            </Typography>
                        </FormLabel>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Switch
                            inputProps={{
                                "aria-label": "show dotfiles"
                            }}
                            checked={profile.settings.showDotFiles}
                            onChange={(event) => {
                                updateSettings("showDotFiles", event.target.checked)
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel>
                            <Typography variant="h5">
                                Use Details View
                            </Typography>
                        </FormLabel>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Switch
                            inputProps={{
                                "aria-label": "use details view"
                            }}
                            checked={profile.settings.useDetailsView}
                            onChange={(event) => {
                                updateSettings("useDetailsView", event.target.checked)
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsDialog
export { defaultSettings }