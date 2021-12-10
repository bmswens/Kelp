// React
import React from 'react'

// Material UI
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

// Material UI Icons
import SettingsIcon from '@mui/icons-material/Settings'
import HelpIcon from '@mui/icons-material/Help'
import StorageIcon from '@mui/icons-material/Storage'
import InfoIcon from '@mui/icons-material/Info'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// custom
import ClusterInfoDialog from '../dialogs/ClusterInfoDialog'
import KelpInfoDialog from '../dialogs/KelpInfoDialog'
import SettingsDialog from '../dialogs/SettingsDialog'


function SettingsMenu(props) {

    const { open, close } = props
    const { anchorElement } = props

    function openHelp() {
        window.open('https://github.com/bmswens/Kelp/blob/master/docs/shortcuts-and-hotkeys.md', "_blank")
    }

    // settings stuff
    const [settingsOpen, setSettingsOpen] = React.useState(false)

    function openSettings() {
        close()
        setSettingsOpen(true)
    }

    function closeSettings() {
        setSettingsOpen(false)
    }

    // cluster stuff
    const [clusterInfoOpen, setClusterInfoOpen] = React.useState(false)

    function openClusterInfo() {
        close()
        setClusterInfoOpen(true)
    }

    function closeClusterInfo() {
        setClusterInfoOpen(false)
    }

    // kelp stuff
    const [kelpInfoOpen, setKelpInfoOpen] = React.useState(false)

    function openKelpInfo() {
        close()
        setKelpInfoOpen(true)
    }

    function closeKelpInfo() {
        setKelpInfoOpen(false)
    }

    return (
        <React.Fragment>
            <Menu
                aria-label="settings menu"
                role="menu"
                anchorEl={anchorElement}
                open={open}
                onClose={close}
            >
                <MenuItem
                    aria-label="open settings"
                    onClick={openSettings}
                >
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={openHelp}
                    aria-label="help page"
                >
                    <ListItemIcon>
                        <HelpIcon />
                    </ListItemIcon>
                    <ListItemText>Help</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    aria-label="open cluster info"
                    onClick={openClusterInfo}
                >
                    <ListItemIcon>
                        <StorageIcon />
                    </ListItemIcon>
                    <ListItemText>Cluster Info</ListItemText>
                </MenuItem>
                <MenuItem
                    aria-label="open kelp info"
                    onClick={openKelpInfo}
                >
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText>Kelp Info</ListItemText>
                </MenuItem>
            </Menu>
            <ClusterInfoDialog
                open={clusterInfoOpen}
                close={closeClusterInfo}
            />
            <KelpInfoDialog
                open={kelpInfoOpen}
                close={closeKelpInfo}
            />
            <SettingsDialog
                open={settingsOpen}
                close={closeSettings}
            />
        </React.Fragment>
    )
}

function Settings(props) {

    const [anchorElement, setAnchorElement] = React.useState(null)
    const [menuOpen, setMenuOpen] = React.useState(false)

    function openMenu(event) {
        setAnchorElement(event.currentTarget)
        setMenuOpen(true)
    }

    function closeMenu() {
        setMenuOpen(false)
    }

    return (
        <React.Fragment>
            <IconButton
                onClick={openMenu}
                aria-label="settings"
            >
                <MoreVertIcon
                    fontSize="large"
                />
            </IconButton>
            <SettingsMenu
                open={menuOpen}
                close={closeMenu}
                anchorElement={anchorElement}
            />
        </React.Fragment>
    )
}

export default Settings