// custom
import { connectionString } from "./filer"
import File from './file'
import { getName } from './file'

class Folder {

    constructor(path, data=null) {
        this.path = path
        this.name = path
        this.entries = []
        this.loaded = false
        this.isFile = false
        if (data) {
            for (let key in data) {
                this[key] = data[key]
            }
        }
    }

    async getContent() {
        let reponse = await fetch(`${connectionString}${this.path}`, {
            headers: {
                "Accept": "application/json"
            }
        })
        let data = await reponse.json()
        if (!(this.name === '/')) {
            let parentName = this.name.slice(0, this.name.lastIndexOf('/'))
            if (parentName === '') {
                parentName = '/'
            }
            let parent = new Folder('..', {FullPath: parentName})
            this.entries.push(parent)
        }
        if (data.Entries === null) {
            data.Entries = []
        }
        for (let obj of data.Entries) {
            if (obj.chunks) {
                let file = new File(obj)
                this.entries.push(file)
            }
            else {
                let name = getName(obj.FullPath)
                let folder = new Folder(name, obj)
                this.entries.push(folder)
            }
        }
        this.loaded = true
        return this.entries
    }

}

export default Folder