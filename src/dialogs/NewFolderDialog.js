// React
import React from 'react'

// Material UI
import { useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'

// custom
import Filer from '../seaweed/filer'
import {LocationContext} from '../context/LocationContextWrapper'
import { getFullPath } from '../seaweed/file'


function NewFolderDialog(props) {

    const {open, close} = props
    const context = React.useContext(LocationContext)
    const theme = useTheme()

    const [folder, setFolder] = React.useState('')
    const [goTo, setGoTo] = React.useState(false)

    function handleClose() {
        setFolder('')
        setGoTo(false)
        close()
    }

    async function submit() {
        let fullPath = getFullPath(folder, context.currentLocation)
        await Filer.createFolder(fullPath)
        context.refresh()
        if (goTo) {
            context.updateLocation(fullPath)
        }
        handleClose()
    }

    function isValid() {
        return folder !== ''
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
        >
            <DialogTitle
                align="center"
            >
                Create Folder
            </DialogTitle>
            <DialogContent>
                <TextField
                    required
                    fullWidth
                    sx={{marginTop: theme.spacing(1)}}
                    label="Folder Name"
                    inputProps={{"aria-label": "folder name"}}
                    role="textbox"
                    value={folder}
                    onChange={(event) =>{
                        setFolder(event.target.value)
                    }}
                />
                <FormGroup>
                    <FormControlLabel
                        sx={{marginTop: theme.spacing(1)}} 
                        control={
                            <Switch
                                checked={goTo}
                                onChange={event => {
                                    setGoTo(event.target.checked)
                                }}
                                inputProps={{ "aria-label": "go to new folder"}}
                            />
                        } 
                        label="Go To New Folder"
                        labelPlacement="start"
                        componentsProps={{align: "left"}}
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained"
                    aria-label="close"
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button 
                    variant="contained"
                    aria-label="submit"
                    onClick={submit}
                    disabled={!isValid()}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewFolderDialog