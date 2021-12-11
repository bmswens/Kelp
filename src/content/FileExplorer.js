// React
import React from 'react'

// Material UI
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'

// local storage
import useLocalStorage from '@rehooks/local-storage'

// custom
import File from './File'
import Folder from './Folder'
import { LocationContext } from '../context/LocationContextWrapper'
import Filer from '../seaweed/filer'
import { defaultSettings } from '../dialogs/SettingsDialog'


function FileExplorer(props) {

    const context = React.useContext(LocationContext)
    const [ content, setContent ] = React.useState([])

    // settings
    const [settings] = useLocalStorage("settings", defaultSettings)

    React.useEffect(function() {
        async function loadFiles() {
            let output = []
            let files = await Filer.getFiles(context.currentLocation)
            for (let obj of files) {
                if (!settings.showDotFiles && obj.name.startsWith('.')) {
                    continue
                }
                if (obj.isFile) {
                    output.push(<File data={obj} key={obj.name} />)
                }
                else {
                    output.push(<Folder data={obj} key={obj.name} />)
                }
            }
            setContent(output)
        }
        loadFiles()
    }, [context, settings])


    return (
        <React.Fragment>
            <Toolbar />
            <CssBaseline />
            <Grid 
                container 
                spacing={2} 
                sx={{ marginLeft: "240px", width: "calc(100vw - 240px)", 
                paddingTop: "7px"}} 
                align="center"
            >
                {content}
            </Grid>
        </React.Fragment>
    )


}

export default FileExplorer