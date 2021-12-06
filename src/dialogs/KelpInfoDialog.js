// React
import React from 'react'

// Material UI
import { Grid, IconButton, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Box } from '@mui/system'

// Material UI Icons
import CloseIcon from '@mui/icons-material/Close'
import GitHubIcon from '@mui/icons-material/GitHub'
import BugReportIcon from '@mui/icons-material/BugReport';


function KelpInfoDialog(props) {

    const { open, close } = props

    const theme = useTheme()

    function openGit() {
        window.open("https://github.com/bmswens/Kelp", "_blank")
    }

    function openBug() {
        window.open('https://github.com/bmswens/Kelp/issues', "_blank")
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth
        >
            <DialogTitle>
                Kelp Info
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
                        <Box sx={{ display: "flex", justifyContent: 'center' }}>
                            <img height="256px" src={process.env.PUBLIC_URL + '/kelp.png'} alt="kelp logo" />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <DialogContentText
                            sx={{
                                marginTop: theme.spacing(1)
                            }}
                        >
                            Kelp Version: {process.env.REACT_APP_KELP_VERSION}
                        </DialogContentText>
                        <DialogContentText>
                            React Version: {React.version}
                        </DialogContentText>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: 'center' }}>
                <IconButton
                    onClick={openGit}
                    aria-label="github"
                >
                    <GitHubIcon fontSize="large" />
                </IconButton>
                <IconButton
                    onClick={openBug}
                    aria-label="report bugs"
                >
                    <BugReportIcon fontSize="large" />
                </IconButton>
            </DialogActions>
        </Dialog>
    )
}

export default KelpInfoDialog