// to test
import File from './file'
import { getName } from './file'

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

describe('The File Object', function() {
    it('should take an object and convert it to a File', function() {
        let f = new File(file)
        expect(f.name).toEqual('example.log')
        expect(f.isFile).toBeTruthy()
    })
    it('should throw an error if "FullPath" is not in the object', function() {
        expect(() => new File({x: 'y'})).toThrow(ReferenceError)
    })
    it('should ble able to return the contents of the file', async function() {
        global.fetch = jest.fn().mockResolvedValue({text: () => 'file content'})
        let f = new File(file)
        let content = await f.getContent()
        expect(content).toEqual('file content')
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8888/example.log')
    })
})

describe('The getName function', function() {
    it('should return the string after the final slash', function() {
        let output = getName('/test')
        expect(output).toEqual('test')
    })
    it('should work with any number of slashes', function() {
        let output = getName('/test/fake/data')
        expect(output).toEqual('data')
    })
})