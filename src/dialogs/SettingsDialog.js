// React
import React from 'react'

// Material UI
import { FormLabel, Grid, IconButton, Switch, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// Material UI Icons
import CloseIcon from '@mui/icons-material/Close'

// local storage
import { useLocalStorage } from '@rehooks/local-storage'

const defaultSettings = {
    showDotFiles: true,
    useDetailsView: false
}


function SettingsDialog(props) {

    const { open, close } = props

    // settings storage
    const [settings, setSettings] = useLocalStorage('settings', defaultSettings)

    function updateSettings(setting, value) {
        setSettings({
            ...settings,
            [setting]: value
        })
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
                            checked={settings.showDotFiles}
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
                            checked={settings.useDetailsView}
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