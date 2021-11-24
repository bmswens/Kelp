// custom
import { connectionString } from "./filer"

function getName(path) {
    let finalSlash = path.lastIndexOf('/')
    return path.slice(finalSlash + 1)
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
    getName
}