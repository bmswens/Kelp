// React
import React from 'react'

// Material UI
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box'

// Material UI Icons
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import InfoIcon from '@mui/icons-material/Info'
import DeleteIcon from '@mui/icons-material/Delete'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import PreviewIcon from '@mui/icons-material/Preview';

// use-double-click
import useDoubleClick from 'use-double-click'

// custom
import Filer, { connectionString } from '../../seaweed/filer'
import { LocationContext } from '../../context/LocationContextWrapper'
import DeleteItemConfirmation from '../../dialogs/DeleteItemConfirmation'
import { SelectionContext } from '../../context/SelectionContextWrapper'
import { ProfileContext } from '../../context/ProfileContextWrapper'
import ImageDisplayDialog from '../../dialogs/ImageDisplayDialog'


function RightClickMenu(props) {
    const { open, close, download, openPreview } = props
    const { anchorElement } = props

    // for deletion
    const { del, name } = props
    const [deleteItemOpen, setDeleteItemOpen] = React.useState(false)

    function closeDelete() {
        setDeleteItemOpen(false)
    }

    // for favorite
    const { favorite } = props

    // cut and copy
    const { cut, copy } = props

    return (
        <React.Fragment>
            <Menu
                aria-label="image context menu"
                role="menu"
                anchorEl={anchorElement}
                open={open}
                onClose={close}
            >
                <MenuItem
                    onClick={() => {
                        openPreview()
                        close()
                    }}
                    aria-label="open image"
                >
                    <ListItemIcon>
                        <PreviewIcon />
                    </ListItemIcon>
                    <ListItemText>Open</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={download}
                    aria-label="download image"
                >
                    <ListItemIcon>
                        <DownloadForOfflineIcon />
                    </ListItemIcon>
                    <ListItemText>Download</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={favorite}
                    aria-label="favorite image"
                >
                    <ListItemIcon>
                        <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText>Favorite</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        copy()
                        close()
                    }}
                    aria-label="copy image"
                >
                    <ListItemIcon>
                        <ContentCopyIcon />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        cut()
                        close()
                    }}
                    aria-label="cut image"
                >
                    <ListItemIcon>
                        <ContentCutIcon />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setDeleteItemOpen(true)
                        close()
                    }}
                    aria-label="delete image"
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


function ImageCard(props) {

    const theme = useTheme()
    const context = React.useContext(LocationContext)
    const selectionContext = React.useContext(SelectionContext)

    // double click
    const isSelected = selectionContext.selected.map(obj => obj.path).includes(props.data.FullPath)
    const selfRef = React.useRef()

    useDoubleClick({
        onSingleClick: function () {
            selectionContext.handle(props.data.FullPath, true)
        },
        onDoubleClick: function () {
            openPreview()
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

    async function del() {
        await Filer.deleteItem(props.data.FullPath)
        context.refresh()
    }

    // favorite
    const profile = React.useContext(ProfileContext)

    function favorite() {
        let bookmark = {
            fullPath: props.data.FullPath,
            shortName: props.data.name,
            isFile: true
        }
        profile.addBookmark(bookmark)
        close()
    }
    
    // cut and copy
    function cut() {
        selectionContext.cut({path: props.data.FullPath, isFile: true})
    }

    function copy() {
        selectionContext.copy({path: props.data.FullPath, isFile: true})
    }

    // Image 
    let source = `${connectionString}${props.data.FullPath}`
    let alt = `${props.data.name} thumbnail`

    const [previewOpen, setPreviewOpen] = React.useState(false)
    function closePreview() {
        setPreviewOpen(false)
    }
    function openPreview() {
        setPreviewOpen(true)
    }

    return (
        <Grid
            item
            xs={3}
        >
            <Card
                ref={selfRef}
                sx={{
                    display: "flex",
                    background: isSelected ? theme.palette.info.dark : theme.palette.background.card,
                    '&:hover': {
                        cursor: "pointer",
                        background: theme.palette.action.selected
                    }
                }}
                onContextMenu={rightClick}
                aria-label={`${isSelected ? "selected " : ''}${props.data.name}`}
                role="button"
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    alignItems: "center"
                }}
                >
                    <CardContent
                        sx={{
                            flex: "1"
                        }}
                    >
                        <img
                            style={{
                                maxWidth: "100%"
                            }}
                            src={source}
                            alt={alt}
                        />
                    </CardContent>
                    <CardContent
                        sx={{
                            flex: "auto",
                            userSelect: "none",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "inline"
                        }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                        >
                            {props.data.name}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            noWrap
                        >
                            {props.data.Mtime}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            <RightClickMenu
                open={menuOpen}
                close={close}
                anchorElement={anchorElement}
                download={download}
                del={del}
                name={props.data.name}
                favorite={favorite}
                cut={cut}
                copy={copy}
                openPreview={openPreview}
            />
            <ImageDisplayDialog
                title={props.data.name}
                source={source}
                download={download}
                open={previewOpen}
                close={closePreview}
            />
        </Grid>
    )

}

export default ImageCard