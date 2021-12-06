
// path for master
const host = process.env.REACT_APP_MASTER_HOST
const port = process.env.REACT_APP_MASTER_PORT
const connectionScheme = process.env.REACT_APP_MASTER_SCHEME
const masterPath = process.env.REACT_APP_MASTER_PATH
var masterConnectionString = `${connectionScheme}://${host}:${port}`

if (!['', '/'].includes(masterPath)) {
    masterConnectionString = masterPath
}

async function getClusterInfo() {
    let output = {}
    // graceful cathing for dev purposes
    try {
        let response = await fetch(`${masterConnectionString}/vol/status?pretty=y`)
        let data = await response.json()
        output.version = data.Version
        output.freeVolumes = data.Volumes.Free
        output.maxVolumes = data.Volumes.Max
        output.datacenters = Object.keys(data.Volumes.DataCenters).length
        output.racks = 0
        output.nodes = 0
        output.size = 0
        for (let datacenter in data.Volumes.DataCenters) {
            for (let rack in data.Volumes.DataCenters[datacenter]) {
                output.racks += 1
                for (let node in data.Volumes.DataCenters[datacenter][rack]) {
                    output.nodes += 1
                    for (let volume of data.Volumes.DataCenters[datacenter][rack][node]) {
                        output.size += volume.Size
                    }
                }
            }
        }
    }
    catch (err) {
        console.log(err)
    }
    return output
}

const Master = {
    getClusterInfo
}

export default Master
export { masterConnectionString }