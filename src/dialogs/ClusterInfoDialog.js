// React
import React from 'react'

// Material UI
import { Grid, IconButton, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'

// Material UI Icons
import CloseIcon from '@mui/icons-material/Close'
import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'

// custom
import Master from '../seaweed/master'

function ClusterInfoDialog(props) {

    const { open, close } = props

    const theme = useTheme()

    const [clusterInfo, setClusterInfo] = React.useState({})

    React.useEffect(() => {
        if (open) {
            Master.getClusterInfo().then(data => setClusterInfo(data))
        }
    }, [open])

    function openGit() {
        window.open("https://github.com/chrislusf/seaweedfs", "_blank")
    }

    function openTwitter() {
        window.open('https://twitter.com/SeaweedFS', "_blank")
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth
        >
            <DialogTitle>
                Cluster Info
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
                            <img height="256px" src={process.env.PUBLIC_URL + '/seaweedfs.png'} />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <DialogContentText
                            sx={{
                                marginTop: theme.spacing(1)
                            }}
                        >
                            Version: {clusterInfo.version}
                        </DialogContentText>
                        <DialogContentText>
                            Datacenters: {clusterInfo.datacenters}
                        </DialogContentText>
                        <DialogContentText>
                            Racks: {clusterInfo.racks}
                        </DialogContentText>
                        <DialogContentText>
                            Nodes: {clusterInfo.nodes}
                        </DialogContentText>
                        <DialogContentText>
                            Storage Used: {clusterInfo.size}
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
                    onClick={openTwitter}
                    aria-label="twitter"
                >
                    <TwitterIcon fontSize="large" />
                </IconButton>
            </DialogActions>
        </Dialog>
    )
}

export default ClusterInfoDialog