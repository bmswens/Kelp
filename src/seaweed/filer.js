// custom
import Folder from './folder'

// path for filer
const host = process.env.REACT_APP_FILER_HOST
const port = process.env.REACT_APP_FILER_PORT
const connectionScheme = process.env.REACT_APP_FILER_SCHEME
const connectionString = `${connectionScheme}://${host}:${port}`

async function getFiles(path) {
    let folder = new Folder(path)
    return folder.getContent()
}

async function getContent(file) {
    let response = await fetch(`${connectionString}${file}`)
    return response.text()
}

const Filer = {
    getFiles,
    getContent
}

export default Filer
export {
    connectionString
}