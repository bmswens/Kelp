// React
import React from 'react'

// Material UI
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'

// Material UI Icons
import CodeIcon from '@mui/icons-material/Code'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'

// custom
import TextFileDialog from '../dialogs/TextFileDialog'
import NewFolderDialog from '../dialogs/NewFolderDialog'


function ActionsList(props) {

    const [open, setOpen] = React.useState(false)

    const [createFileOpen, setCreateFileOpen] = React.useState(false)
    const [createFolderOpen, setCreateFolderOpen] = React.useState(false)

    return (
        <React.Fragment>
            <List>
                <ListItem
                    button
                    onClick={() => setOpen(!open)}
                >
                    <ListItemIcon>
                        <CodeIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Actions"
                    />
                    {open ? <ExpandLess titleAccess="close actions" /> : <ExpandMore />}
                </ListItem>
                <Collapse 
                    in={open} 
                    timeout="auto" 
                    unmountOnExit
                >
                    <List
                        disablePadding
                    >
                        <ListItem
                            button
                            sx={{ pl: 4 }}
                            onClick={() => setCreateFileOpen(true)}
                        >
                            <ListItemIcon>
                                <NoteAddIcon />      
                            </ListItemIcon>
                            <ListItemText
                                primary="Create File"
                            />
                        </ListItem>
                        <ListItem
                            button
                            sx={{ pl: 4 }}
                            onClick={() => setCreateFolderOpen(true)}
                        >
                            <ListItemIcon>
                                <CreateNewFolderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Create Folder"
                            />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <TextFileDialog
                open={createFileOpen}
                close={() => setCreateFileOpen(false)}
            />
            <NewFolderDialog
                open={createFolderOpen}
                close={() => setCreateFolderOpen(false)}
            />
        </React.Fragment>
    )
}

export default ActionsList