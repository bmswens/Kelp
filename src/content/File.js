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

// use-double-click
import useDoubleClick from 'use-double-click'

// custom
import { connectionString } from '../seaweed/filer'


function RightClickMenu(props) {
    const { open, close, download } = props
    const { anchorElement } = props

    return (
        <Menu
            aria-label="file context menu"
            role="menu"
            anchorEl={anchorElement}
            open={open}
            onClose={close}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem
                onClick={download}
            >
                <ListItemIcon>
                    <DownloadForOfflineIcon />
                </ListItemIcon>
                <ListItemText>Download</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem >
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText>Properties</ListItemText>
            </MenuItem>
        </Menu>
    )
}


function File(props) {

    const theme = useTheme()

    // double click
    const [isSelected, setIsSelected] = React.useState(false)
    const selfRef = React.useRef()

    useDoubleClick({
        onSingleClick: function() {
            setIsSelected(!isSelected)
        },
        onDoubleClick: function() {
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

    return (
        <Grid
            item
            xs={3}
        >
            <IconButton
                 ref={selfRef}
                 sx={{
                     background: isSelected ? theme.palette.info.main : theme.palette.background.default
                 }}
                 onContextMenu={rightClick}
                 aria-label={`${isSelected ? "selected " : '' }${props.data.name}`}
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
            />
        </Grid>
    )

}

export default File