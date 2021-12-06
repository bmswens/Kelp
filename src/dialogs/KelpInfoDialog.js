// React
import React from 'react'

// Material UI
import { Typography, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'


function KelpInfoDialog(props) {

    const {open, close} = props

    const theme = useTheme()

    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth
        >
            <DialogTitle
                align="center"
            >
                Kelp Info
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", justifyContent: 'center' }}>
                    <img height="256px" src={process.env.PUBLIC_URL + '/kelp.png'} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained"
                    aria-label="close"
                    onClick={close}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default KelpInfoDialog