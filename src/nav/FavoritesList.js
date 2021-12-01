import React from 'react'

// Material UI
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// Material UI Icons
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import DescriptionIcon from '@mui/icons-material/Description'
import { Folder as FolderIcon } from '@mui/icons-material'

// rehooks local storage
import { useLocalStorage } from '@rehooks/local-storage'

// custom
import { LocationContext } from './LocationContextWrapper'
import { connectionString } from '../seaweed/filer'


function RightClickMenu(props) {

    const { open, close, index } = props
    const { anchorElement } = props

    function remove() {
        let favoritesString = window.localStorage.getItem('favorites')
        let favorites = JSON.parse(favoritesString)
        favorites.splice(index)
        window.localStorage.setItem('favorites', JSON.stringify(favorites))
        close()
    }

    return (
        <Menu
            aria-label="favorite item context menu"
            role="menu"
            anchorEl={anchorElement}
            open={open}
            onClose={close}
        >
            <MenuItem
                onClick={remove}
                aria-label="remove favorite item"
            >
                <ListItemIcon>
                    <BookmarkRemoveIcon />
                </ListItemIcon>
                <ListItemText>Remove From Favorites</ListItemText>
            </MenuItem>
        </Menu>
    )
}


function FavoriteItem(props) {

    const { data, index } = props
    const context = React.useContext(LocationContext)

    function handleClick() {
        if (data.isFile) {
            window.open(`${connectionString}${data.fullPath}`, '_blank')
        }
        else {
            context.updateLocation(data.fullPath)
        }
    }

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

    return (
        <React.Fragment>
            <ListItem
                button
                sx={{ pl: 4 }}
                onClick={handleClick}
                onContextMenu={rightClick}
            >
                <ListItemIcon>
                    {data.isFile ? <DescriptionIcon /> : <FolderIcon />}
                </ListItemIcon>
                <ListItemText
                    primary={data.shortName}
                />
            </ListItem>
            <RightClickMenu
                open={menuOpen}
                close={close}
                index={index}
                anchorElement={anchorElement}
            />
        </React.Fragment>
    )

}

function FavoritesList(props) {

    const [open, setOpen] = React.useState(false)

    const [favorites] = useLocalStorage("favorites", [])

    return (
        <List>
            <ListItem
                button
                onClick={() => setOpen(!open)}
            >
                <ListItemIcon>
                    <BookmarksIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Favorites"
                />
                {open ? <ExpandLess titleAccess="close favorites" /> : <ExpandMore />}
            </ListItem>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <List
                    disablePadding
                >
                    {favorites.map((favorite, index) => <FavoriteItem data={favorite} index={index} key={index} />)}
                </List>
            </Collapse>
        </List>
    )
}

export default FavoritesList
export { FavoriteItem }