// to test
import Folder from './folder'

const folder = {
    "FullPath":"/topics",
    "Mtime":"2021-11-22T01:29:37Z",
    "Crtime":"2021-11-22T01:29:37Z",
    "Mode":2147484141,"Uid":0,
    "Gid":0,
    "Mime":"",
    "Replication":"",
    "Collection":"",
    "TtlSec":0,
    "DiskType":"",
    "UserName":"",
    "GroupNames":null,
    "SymlinkTarget":"",
    "Md5":null,
    "FileSize":0,
    "Extended":null,
    "HardLinkId":null,
    "HardLinkCounter":0,
    "Content":null,
    "Remote":null,
    "name": "topics"
}

const mockResponse = {"Path":"","Entries":[{"FullPath":"/mattermost.log","Mtime":"2021-11-22T01:28:44Z","Crtime":"2021-11-22T01:28:44Z","Mode":432,"Uid":0,"Gid":0,"Mime":"text/x-log","Replication":"","Collection":"","TtlSec":0,"DiskType":"","UserName":"","GroupNames":null,"SymlinkTarget":"","Md5":"i/H1V8pY1Uf+jB+FTE/0jw==","FileSize":866810,"Extended":null,"chunks":[{"file_id":"2,01dbadae45","size":866810,"mtime":1637544524682246133,"e_tag":"i/H1V8pY1Uf+jB+FTE/0jw==","fid":{"volume_id":2,"file_key":1,"cookie":3685592645},"is_compressed":true}],"HardLinkId":null,"HardLinkCounter":0,"Content":null,"Remote":null},{"FullPath":"/topics","Mtime":"2021-11-22T01:29:37Z","Crtime":"2021-11-22T01:29:37Z","Mode":2147484141,"Uid":0,"Gid":0,"Mime":"","Replication":"","Collection":"","TtlSec":0,"DiskType":"","UserName":"","GroupNames":null,"SymlinkTarget":"","Md5":null,"FileSize":0,"Extended":null,"HardLinkId":null,"HardLinkCounter":0,"Content":null,"Remote":null}],"Limit":100,"LastFileName":"topics","ShouldDisplayLoadMore":false}

describe('The Folder Object', function() {
    it('should initialize with just a path', function() {
        let f = new Folder('/')
        expect(f.name).toEqual('/')
    })
    it('should allow pre-pulled data to be passed in', function() {
        let f = new Folder('/topics', folder)
        expect(f.name).toEqual('topics')
    })
    it('should be able to retireve content of a folder', async function() {
        global.fetch = jest.fn().mockResolvedValue({json: () => mockResponse})
        let f = new Folder('/')
        let entries = await f.getContent()
        expect(entries).toHaveLength(2)
    })
    it('should put the UNIX ".." folder as the first item', async function() {
        global.fetch = jest.fn().mockResolvedValue({json: () => mockResponse})
        let f = new Folder('/topics')
        let entries = await f.getContent()
        expect(entries).toHaveLength(3)
        expect(entries[0].name).toEqual('..')
    })
})