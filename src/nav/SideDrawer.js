// React
import React from 'react'

// Material UI
import { useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'

// Matierial UI Icons
import StarIcon from '@mui/icons-material/Star'
import CodeIcon from '@mui/icons-material/Code'



function DrawerHeader(props) {

    const theme = useTheme()

    return (
        <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: theme.spacing(0, 1),
                justifyContent: 'flex-end',
            }}
        >
            {props.children}
        </Toolbar>
    )
}

function SideDrawer(props) {

    return (
        <Drawer
            sx={{
                width: "240px",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: "240px",
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={true}
        >
            <DrawerHeader>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem
                    button
                >
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Favorites"
                    />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem
                    button
                >
                    <ListItemIcon>
                        <CodeIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Actions"
                    />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default SideDrawer
export {
    DrawerHeader
}