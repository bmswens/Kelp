// React
import React from 'react'

// Material UI
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'

// custom
import File from './File'
import Folder from './Folder'
import { LocationContext } from '../nav/LocationContextWrapper'
import Filer from '../seaweed/filer'


function FileExplorer(props) {

    const context = React.useContext(LocationContext)
    const [ content, setContent ] = React.useState([])

    React.useEffect(function() {
        async function loadFiles() {
            let output = []
            let files = await Filer.getFiles(context.currentLocation)
            for (let obj of files) {
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
    }, [context])


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