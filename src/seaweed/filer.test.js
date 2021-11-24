// to test
import Filer from './filer'

const mockResponse = {"Path":"","Entries":[{"FullPath":"/mattermost.log","Mtime":"2021-11-22T01:28:44Z","Crtime":"2021-11-22T01:28:44Z","Mode":432,"Uid":0,"Gid":0,"Mime":"text/x-log","Replication":"","Collection":"","TtlSec":0,"DiskType":"","UserName":"","GroupNames":null,"SymlinkTarget":"","Md5":"i/H1V8pY1Uf+jB+FTE/0jw==","FileSize":866810,"Extended":null,"chunks":[{"file_id":"2,01dbadae45","size":866810,"mtime":1637544524682246133,"e_tag":"i/H1V8pY1Uf+jB+FTE/0jw==","fid":{"volume_id":2,"file_key":1,"cookie":3685592645},"is_compressed":true}],"HardLinkId":null,"HardLinkCounter":0,"Content":null,"Remote":null},{"FullPath":"/topics","Mtime":"2021-11-22T01:29:37Z","Crtime":"2021-11-22T01:29:37Z","Mode":2147484141,"Uid":0,"Gid":0,"Mime":"","Replication":"","Collection":"","TtlSec":0,"DiskType":"","UserName":"","GroupNames":null,"SymlinkTarget":"","Md5":null,"FileSize":0,"Extended":null,"HardLinkId":null,"HardLinkCounter":0,"Content":null,"Remote":null}],"Limit":100,"LastFileName":"topics","ShouldDisplayLoadMore":false}
const file = {
    "FullPath": "/example.log",
    "Mtime": "2021-11-22T01:28:44Z",
    "Crtime": "2021-11-22T01:28:44Z",
    "Mode": 432,
    "Uid": 0,
    "Gid": 0,
    "Mime": "text/x-log",
    "Replication": "",
    "Collection": "",
    "TtlSec": 0,
    "DiskType": "",
    "UserName": "",
    "GroupNames": null,
    "SymlinkTarget": "",
    "Md5": "i/H1V8pY1Uf+jB+FTE/0jw==",
    "FileSize": 866810,
    "Extended": null,
    "chunks": [{ "file_id": "2,01dbadae45", "size": 866810, "mtime": 1637544524682246133, "e_tag": "i/H1V8pY1Uf+jB+FTE/0jw==", "fid": { "volume_id": 2, "file_key": 1, "cookie": 3685592645 }, "is_compressed": true }],
    "HardLinkId": null,
    "HardLinkCounter": 0,
    "Content": null,
    "Remote": null,
}

describe('The Filer Object', function() {
    it('should responsed with the content of a folder', async function() {
        global.fetch = jest.fn().mockResolvedValue({json: () => mockResponse})
        let entries = await Filer.getFiles('/')
        expect(entries).toHaveLength(2)
    })
    it('should respond with the content of a file', async function() {
        global.fetch = jest.fn().mockResolvedValue({text: () => 'file content'})
        let content = await Filer.getContent('/example.log')
        expect(content).toEqual('file content')
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8888/example.log')
    })
})