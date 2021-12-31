// React
import React from 'react'

// testing library
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import ProfileContextWrapper from './ProfileContextWrapper'
import { ProfileContext, defaultProfile } from './ProfileContextWrapper'

// mock
import Filer from '../seaweed/filer'


function ProfileTester(props) {

    const profile = React.useContext(ProfileContext)

    function switchProfile() {
        profile.switchProfile('john')
    }

    function toggleDarkMode() {
        profile.updateSetting("useDarkMode", false)
    }

    function makeNewProfile() {
        profile.makeNewProfile('test')
    }

    return (
        <React.Fragment>
            <button aria-label="switch profiles" onClick={switchProfile}>Switch</button>
            <button aria-label="toggle dark mode" onClick={toggleDarkMode}>Dark Mode</button>
            <button aria-label="make new profile" onClick={makeNewProfile}>Make New</button>
            <p role="paragraph" data-testid="dark-mode">{profile.settings.useDarkMode.toString()}</p>
            <p role="paragraph" data-testid="profile-name">{profile.current}</p>
            <p role="paragraph" data-testid="profile-list">{profile.options.join(', ')}</p>
        </React.Fragment>
    )
}

describe('<ProfileContextWrapper> using localStorage', function() {

    beforeEach(() => {
        render(
            <ProfileContextWrapper>
                <ProfileTester />
            </ProfileContextWrapper>
        )
    })

    afterEach(() => {
        localStorage.clear()
    })

    it('should default to localstorage', function() {
        let profileName = screen.getByTestId('profile-name')
        expect(profileName.innerHTML).toEqual('localstorage')
    })
    it('should be able to update settings using localstorage', function() {
        let toggleButton = screen.getByRole('button', { name: "toggle dark mode" })
        userEvent.click(toggleButton)
        let darkMode = screen.getByTestId('dark-mode')
        expect(darkMode.innerHTML).toEqual('false')
    })
})

describe('<ProfileContextWrapper> with SeaweedFS profiles enabled', function() {

    const mockProfiles = [
        {
            "FullPath": "/.kelp/profiles/default.json",
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
        },
        {
            "FullPath": "/.kelp/profiles/john.json",
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
    ]
    
    const mockProfile = {
        ...defaultProfile,
        current: "default"
    }

    beforeEach(async () => {
        Filer.getFiles = jest.fn(async () => mockProfiles)
        Filer.getContent = jest.fn(async () => JSON.stringify(mockProfile))
        Filer.uploadFile = jest.fn(async () => Filer.getFiles = jest.fn(() => [...mockProfiles, {FullPath: "/.kelp/profiles/test.json"}]))
        localStorage.setItem("profile", JSON.stringify({ profile: "default" }))
        render(
            <ProfileContextWrapper>
                <ProfileTester />
            </ProfileContextWrapper>
        )
        // makes the ""...wrapped in act()" go away
        await waitFor(() => {
            let profileName = screen.getByTestId('profile-name')
            expect(profileName.innerHTML).toEqual('default')
        })
    })

    afterEach(() => {
        localStorage.clear()
        jest.restoreAllMocks()
    })

    it('should default to using "default.json"', function() {
        let profileName = screen.getByTestId('profile-name')
        expect(profileName.innerHTML).toEqual('default')
    })
    it('should allow you to switch profiles', async function() {
        let switchButton = screen.getByRole('button', { name: "switch profiles" })
        userEvent.click(switchButton)
        await waitFor(() => {
            let profileName = screen.getByTestId('profile-name')
            expect(profileName.innerHTML).toEqual('john')
        })
    })
    it('should allow you to update the current profile', async function() {
        let toggleButton = screen.getByRole('button', { name: "toggle dark mode" })
        userEvent.click(toggleButton)
        await waitFor(() => {
            let darkMode = screen.getByTestId('dark-mode')
            expect(darkMode.innerHTML).toEqual('false')
        })
    })
    it('should allow you to create a new profile, copying current settings', async function() {
        let profiles = screen.getByTestId('profile-list')
        expect(profiles.innerHTML).toEqual('default, john')
        let makeNewButton = screen.getByRole('button', { name: "make new profile" })
        userEvent.click(makeNewButton)
        await waitFor(() => {
            profiles = screen.getByTestId('profile-list')
            expect(profiles.innerHTML).toEqual('default, john, test')
        })
    })
})