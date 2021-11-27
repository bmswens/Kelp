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

async function uploadFile(path, file) {
    let formData = new FormData()
    formData.append(path, file)
    return fetch(`${connectionString}${path}`, {
        method: 'POST',
        body: formData
    })
}

async function deleteItem(path, reursive=false) {
    let url = `${connectionString}${path}?recursive=${reursive}`
    return fetch(url, {
        method: 'DELETE'
    })
}

const Filer = {
    getFiles,
    getContent,
    uploadFile,
    deleteItem
}

export default Filer
export {
    connectionString
}