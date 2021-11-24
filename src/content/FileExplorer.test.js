// React
import React from 'react'

// testing library
import { render, screen, waitFor } from '@testing-library/react'

// to test
import FileExplorer from './FileExplorer'
import { LocationContext } from '../nav/LocationContextWrapper'

// mock
import Filer from '../seaweed/filer'
const response = [{ "FullPath": "/example.log", "name": "example.log", isFile: true, "Mtime": "2021-11-22T01:28:44Z", "Crtime": "2021-11-22T01:28:44Z", "Mode": 432, "Uid": 0, "Gid": 0, "Mime": "text/x-log", "Replication": "", "Collection": "", "TtlSec": 0, "DiskType": "", "UserName": "", "GroupNames": null, "SymlinkTarget": "", "Md5": "i/H1V8pY1Uf+jB+FTE/0jw==", "FileSize": 866810, "Extended": null, "chunks": [{ "file_id": "2,01dbadae45", "size": 866810, "mtime": 1637544524682246133, "e_tag": "i/H1V8pY1Uf+jB+FTE/0jw==", "fid": { "volume_id": 2, "file_key": 1, "cookie": 3685592645 }, "is_compressed": true }], "HardLinkId": null, "HardLinkCounter": 0, "Content": null, "Remote": null }, { "FullPath": "/topics", "Mtime": "2021-11-22T01:29:37Z", "Crtime": "2021-11-22T01:29:37Z", "Mode": 2147484141, "Uid": 0, "Gid": 0, "Mime": "", "Replication": "", "Collection": "", "TtlSec": 0, "DiskType": "", "UserName": "", "GroupNames": null, "SymlinkTarget": "", "Md5": null, "FileSize": 0, "Extended": null, "HardLinkId": null, "HardLinkCounter": 0, "Content": null, "Remote": null, "name": "topics" }]

describe('<Folder>', function () {
    let locationState
    beforeEach(function () {
        Filer.getFiles = jest.fn(async () => response)
        locationState = {
            currentLocation: '/',
            history: [],
            updateLocation: jest.fn(),
            goBack: jest.fn()
        }
    })
    it('should display the names of the child nodes', async function() {
        // React was unhappy about act() until rendering happend in here.
        render(
            <LocationContext.Provider value={locationState}>
                <FileExplorer />
            </LocationContext.Provider>
        )
        let folder = await screen.findByText('topics')
        let file = await screen.findByText('example.log')
        expect(folder).not.toBeNull()
        expect(file).not.toBeNull()
        
    })
})