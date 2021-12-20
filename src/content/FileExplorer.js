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
import DetailsView from './DetailsView'


function FileExplorer(props) {

    const context = React.useContext(LocationContext)
    const [ content, setContent ] = React.useState([])
    const [ files, setFiles ] = React.useState([])

    // settings
    const [settings] = useLocalStorage("settings", defaultSettings)

    React.useEffect(function() {
        async function loadFiles() {
            let output = []
            let tempFiles = await Filer.getFiles(context.currentLocation)
            let outputFiles = []
            for (let obj of tempFiles) {
                if (!settings.showDotFiles && obj.name.startsWith('.')) {
                    continue
                }
                if (obj.isFile) {
                    output.push(<File data={obj} key={obj.name} />)
                }
                else {
                    output.push(<Folder data={obj} key={obj.name} />)
                }
                outputFiles.push(obj)
            }
            setContent(output)
            setFiles(outputFiles)
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
                sx={{ 
                    marginLeft: "240px", 
                    width: "calc(100vw - 240px)", 
                    paddingTop: "15px",
                    height: "calc(100vh - 64px)"
                }} 
                align="center"
            >
                {settings.useDetailsView
                    ? <DetailsView files={files} />
                    : content
                }
            </Grid>
        </React.Fragment>
    )


}

export default FileExplorer