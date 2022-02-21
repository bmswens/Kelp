// React
import React from 'react'

// Material UI
import { IconButton, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// Material UI Icons
import CloseIcon from '@mui/icons-material/Close'
import DownloadIcon from '@mui/icons-material/Download'


function ImageDisplayDialog(props) {

    const { open, close, title, source, download } = props

    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth
        >
            <DialogTitle>
                {title}
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
                <img
                    alt={title}
                    src={source}
                />
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: 'center' }}>
                <IconButton
                    onClick={download}
                    aria-label="download"
                >
                    <DownloadIcon fontSize="large" />
                </IconButton>
            </DialogActions>
        </Dialog>
    )
}

export default ImageDisplayDialog