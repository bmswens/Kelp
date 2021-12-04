// React
import React from 'react'

// Material UI
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'

// Material UI Icons
import DescriptionIcon from '@mui/icons-material/Description'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import InfoIcon from '@mui/icons-material/Info'
import DeleteIcon from '@mui/icons-material/Delete'
import BookmarkIcon from '@mui/icons-material/Bookmark'

// use-double-click
import useDoubleClick from 'use-double-click'

// rehooks local storage
import { useLocalStorage } from '@rehooks/local-storage'

// custom
import Filer, { connectionString } from '../seaweed/filer'
import { LocationContext } from '../context/LocationContextWrapper'
import DeleteItemConfirmation from '../dialogs/DeleteItemConfirmation'
import { SelectionContext } from '../context/SelectionContextWrapper'


function RightClickMenu(props) {
    const { open, close, download } = props
    const { anchorElement } = props

    // for deletion
    const { del, name } = props
    const [deleteItemOpen, setDeleteItemOpen] = React.useState(false)

    function closeDelete() {
        setDeleteItemOpen(false)
    }

    // for favorite
    const { favorite } = props

    return (
        <React.Fragment>
            <Menu
                aria-label="file context menu"
                role="menu"
                anchorEl={anchorElement}
                open={open}
                onClose={close}
            >
                <MenuItem
                    onClick={download}
                    aria-label="open file"
                >
                    <ListItemIcon>
                        <DownloadForOfflineIcon />
                    </ListItemIcon>
                    <ListItemText>Download</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={favorite}
                    aria-label="favorite file"
                >
                    <ListItemIcon>
                        <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText>Favorite</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setDeleteItemOpen(true)
                    }}
                    aria-label="delete file"
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
                isFile={true}
            />
        </React.Fragment>
    )
}


function File(props) {

    const theme = useTheme()
    const context = React.useContext(LocationContext)
    const selectionContext = React.useContext(SelectionContext)

    // double click
    const isSelected = selectionContext.selected.includes(props.data.FullPath)
    const selfRef = React.useRef()

    useDoubleClick({
        onSingleClick: function () {
            selectionContext.handle(props.data.FullPath)
        },
        onDoubleClick: function () {
            download()
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

    function download() {
        window.open(`${connectionString}${props.data.FullPath}`, '_blank')
        close()
    }

    function del() {
        Filer.deleteItem(props.data.FullPath)
        context.refresh()
    }

    // favorite
    const [favorites, setFavorites] = useLocalStorage('favorites', [])

    function favorite() {
        setFavorites([
            ...favorites,
            {
                fullPath: props.data.FullPath,
                shortName: props.data.name,
                isFile: true
            }
        ])
        close()
    }

    return (
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
                aria-label={`${isSelected ? "selected " : ''}${props.data.name}`}
            >
                <DescriptionIcon fontSize="large" />
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
                download={download}
                del={del}
                name={props.data.name}
                favorite={favorite}
            />
        </Grid>
    )

}

export default File