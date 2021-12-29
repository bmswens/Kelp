// React
import React from 'react'

// Material UI
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'

// local storage
import useLocalStorage from '@rehooks/local-storage'

// custom
import { LocationContext } from '../context/LocationContextWrapper'
import Filer from '../seaweed/filer'
import { defaultSettings } from '../dialogs/SettingsDialog'
import DetailsView from './DetailsView'
import CardView from './cardview/CardView'


function FileExplorer(props) {

    const context = React.useContext(LocationContext)
    const [ files, setFiles ] = React.useState(props.files || [])

    // settings
    const [settings] = useLocalStorage("settings", defaultSettings)

    React.useEffect(function() {
        async function loadFiles() {
            let tempFiles = await Filer.getFiles(context.currentLocation)
            let output = []
            for (let f of tempFiles) {
                if (!settings.showDotFiles && f.name.startsWith('.')) {
                    continue
                }
                output.push(f)
            }
            setFiles(output)
        }
        loadFiles()
    }, [context.currentLocation, settings.showDotFiles])


    return (
        <React.Fragment>
            <Toolbar />
            <CssBaseline />
            {settings.useDetailsView
                ? <DetailsView files={files} />
                : <CardView files={files} />
            }
        </React.Fragment>
    )


}

export default FileExplorer