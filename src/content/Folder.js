// React
import React from 'react'

// Material UI
import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'

// Material UI Icons
import { Folder as FolderIcon } from '@mui/icons-material'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import InfoIcon from '@mui/icons-material/Info'
import DeleteIcon from '@mui/icons-material/Delete'

// use-double-click
import useDoubleClick from 'use-double-click'

// custom
import { LocationContext } from '../nav/LocationContextWrapper'
import Filer from '../seaweed/filer'
import DeleteItemConfirmation from '../dialogs/DeleteItemConfirmation'



function RightClickMenu(props) {
    const { open, close, enter } = props
    const { anchorElement } = props

    // for deletion
    const { del, name } = props
    const [deleteItemOpen, setDeleteItemOpen] = React.useState(false)

    function closeDelete() {
        setDeleteItemOpen(false)
    }

    return (
        <React.Fragment>
            <Menu
                aria-label="folder context menu"
                role="menu"
                anchorEl={anchorElement}
                open={open}
                onClose={close}
            >
                <MenuItem
                    onClick={enter}
                    aria-label="open folder"
                >
                    <ListItemIcon>
                        <OpenInBrowserIcon />
                    </ListItemIcon>
                    <ListItemText>Open</ListItemText>
                </MenuItem>
                <Divider />
                    <MenuItem
                        onClick={() => {
                            setDeleteItemOpen(true)
                        }}
                        aria-label="delete folder"
                    >
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                <Divider />
                <MenuItem >
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText>Properties</ListItemText>
                </MenuItem>
            </Menu>
            <DeleteItemConfirmation
                name={name}
                del={del}
                close={closeDelete}
                open={deleteItemOpen}
                isFile={false}
            />
        </React.Fragment>
    )
}


function Folder(props) {

    const theme = useTheme()
    
    const context = React.useContext(LocationContext)

    // double click
    const [isSelected, setIsSelected] = React.useState(false)
    const selfRef = React.useRef()

    useDoubleClick({
        onSingleClick: function() {
            setIsSelected(!isSelected)
        },
        onDoubleClick: function() {
            enter()
        },
        ref: selfRef
    })

    // right click
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [anchorElement, setAnchorElement] = React.useState(null)

    function rightClick(event) {
        event.preventDefault()
        setMenuOpen(true)
        setAnchorElement(event.currentTarget)
    }

    function close() {
        setMenuOpen(false)
        setAnchorElement(null)
    }

    function enter() {
        close()
        context.updateLocation(props.data.FullPath)
    }

    function del() {
        Filer.deleteItem(props.data.FullPath, true)
        context.refresh()
    }
    
    return(
        <Grid 
            item 
            xs={2}

        >
            <IconButton
                ref={selfRef}
                sx={{
                    background: isSelected ? theme.palette.info.main : theme.palette.background.default
                }}
                onContextMenu={rightClick}
                aria-label={`${isSelected ? "selected " : '' }${props.data.name}`}
            >
                <FolderIcon fontSize="large"/>
            </IconButton>
            <Typography
                sx={{
                    '&:hover': {
                        cursor: "pointer"
                    }
                }}
            >
                {props.data.name}
            </Typography>
            <RightClickMenu
                open={menuOpen}
                close={close}
                anchorElement={anchorElement}
                enter={enter}
                del={del}
                name={props.data.name}
            />
        </Grid>
    )
}

export default Folder