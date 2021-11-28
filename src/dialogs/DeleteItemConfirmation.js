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
import Grid from '@mui/material/Grid'

// Material UI Icons
import DescriptionIcon from '@mui/icons-material/Description'
import { Folder as FolderIcon } from '@mui/icons-material'


function DeleteItemConfirmation(props) {

    const theme = useTheme()

    const {
        del,
        close,
        name,
        open,
        isFile
    } = props

    function handleConfirm() {
        del()
        close()
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth
        >
            <DialogTitle
                align="center"
            >
                Delete {isFile ? "File" : "Folder"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to permanently delete this {isFile ? "file" : "folder"}?
                </DialogContentText>
                <Grid
                    container
                    spacing={1}
                    sx={{marginTop: theme.spacing(1)}}
                >
                    <Grid item xs={6} align="center">
                        {isFile ?
                            <DescriptionIcon sx={{fontSize: "128px"}} /> :
                            <FolderIcon sx={{fontSize: "128px"}} />
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            {name}
                        </Typography>
                        <Typography>
                            Type: {isFile ? "File" : "Folder"}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained"
                    aria-label="cancel"
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button 
                    variant="contained"
                    aria-label="confirm"
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteItemConfirmation