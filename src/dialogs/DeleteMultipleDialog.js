// React
import React from 'react'

// Material UI
import { useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// Material UI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'


function DeleteMultipleDialog(props) {

    const theme = useTheme()

    const {
        del,
        close,
        files,
        open,
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
                Delete Items
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to permanently delete these {files.length} items?
                </DialogContentText>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="show files"
                    >
                        <Typography>Files</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            {files.map(fileName => {
                                return (
                                    <ListItem key={fileName}>
                                        <ListItemIcon>
                                            <ArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={fileName}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
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

export default DeleteMultipleDialog