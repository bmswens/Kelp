// custom
import { connectionString } from "./filer"

function getName(path) {
    let finalSlash = path.lastIndexOf('/')
    return path.slice(finalSlash + 1)
} 

function getFullPath(fileName, currentLocation) {
    let output
    if (fileName.startsWith('/')) {
        output = fileName
    }
    else if (fileName.startsWith('../')) {
        let parentName = currentLocation.slice(0, currentLocation.lastIndexOf('/'))
        fileName = fileName.replace('../', '/')
        output = `${parentName}${fileName}`
    }
    else if (fileName.startsWith('./')) {
        fileName = fileName.replace('./', '/')
        output = `${currentLocation}${fileName}`
    }
    else {
        output = `${currentLocation}${fileName}`
    }
    return output
}

class File {

    constructor(data) {
        if (!data.FullPath) {
            throw ReferenceError("File objects require 'FullPath' keyword")
        }
        for (let key in data) {
            this[key] = data[key]
        }
        this.name = getName(data.FullPath)
        this.isFile = true
    }

    async getContent() {
        let response = await fetch(`${connectionString}${this.FullPath}`)
        return response.text()
    }
}

export default File
export {
    getName,
    getFullPath
}