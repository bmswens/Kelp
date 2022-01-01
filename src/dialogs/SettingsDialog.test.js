// React
import React from 'react'

// testing library
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import SettingsDialog from './SettingsDialog'
import ContextWrappers from '../context/ContextWrappers'

// mock
import Filer from '../seaweed/filer'
import { defaultProfile } from '../context/ProfileContextWrapper'
import { waitForDebugger } from 'inspector'

function getSetting(name) {
    let resp = localStorage.getItem("settings")
    let settings = JSON.parse(resp)
    return settings[name]
}

describe('<SettingsDialog>', function() {
    let close
    beforeEach(() => {
        close = jest.fn()
        render(
            <ContextWrappers>
                <SettingsDialog
                    open={true}
                    close={close}
                />
            </ContextWrappers>
        )
    })
    afterEach(() => {
        jest.resetAllMocks()
    })
    it('should display the title', function() {
        let dialog = screen.getByRole('dialog', { name: "Settings" })
        expect(dialog).not.toBeNull()
    })
    it('should close', function() {
        let closeButton = screen.getByRole('button', { name: "close" })
        userEvent.click(closeButton)
        expect(close).toHaveBeenCalled()
    })
    it('should be able to hide dotfiles', function() {
        let switchButton = screen.getByRole('checkbox', { name: "show dotfiles" })
        userEvent.click(switchButton)
        let dotSetting = getSetting('showDotfiles')
        expect(dotSetting).not.toBeTruthy()
    })
    it('should be able to use list display', function() {
        let switchButton = screen.getByRole('checkbox', { name: "use details view" })
        userEvent.click(switchButton)
        let dotSetting = getSetting('useDetailsView')
        expect(dotSetting).toBeTruthy()
    })
    it('should be able to toggle dark mode', function() {
        let switchButton = screen.getByRole('checkbox', { name: "use dark mode" })
        userEvent.click(switchButton)
        let darkSetting = getSetting('useDarkMode')
        expect(darkSetting).not.toBeTruthy()
    })
    it('should allow a user to select a profile from options', async function() {
        Filer.getFiles = jest.fn(async () => [{FullPath: "/.kelp/profiles/default.json"}])
        Filer.getContent = jest.fn(async () => JSON.stringify({...defaultProfile, current: "default"}))
        Filer.uploadFile = jest.fn(async () => Filer.getFiles = jest.fn(() => [{FullPath: "/.kelp/profiles/default.json"}, {FullPath: "/.kelp/profiles/test.json"}]))
        let textField = screen.getByRole('textbox', { name: "select profile" })
        userEvent.type(textField, "default")
        let swithButton = screen.getByRole('button', { name: "switch profiles" })
        userEvent.click(swithButton)
        await waitFor(() => {
            let text = screen.getByRole('textbox', { name: "select profile" })
            expect(text).not.toBeNull()
        })
    })
    it('should allow a user to create a new profile', async function() {
        Filer.getFiles = jest.fn(async () => [{FullPath: "/.kelp/profiles/default.json"}])
        Filer.getContent = jest.fn(async () => JSON.stringify({...defaultProfile, current: "default"}))
        Filer.uploadFile = jest.fn(async () => Filer.getFiles = jest.fn(() => [{FullPath: "/.kelp/profiles/default.json"}, {FullPath: "/.kelp/profiles/test.json"}]))
        let textField = screen.getByRole('textbox', { name: "select profile" })
        userEvent.type(textField, "test")
        let swithButton = screen.getByRole('button', { name: "switch profiles" })
        userEvent.click(swithButton)
        await waitFor(() => {
            let text = screen.getByRole('textbox', { name: "select profile" })
            expect(text).not.toBeNull()
        })
    })
})