// React
import React from 'react'

// testing library
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import SettingsDialog from './SettingsDialog'
import ThemeWrapper from '../context/ThemeWrapper'

// mock
import { defaultProfile } from '../context/ProfileContextWrapper'
import { ProfileContext } from '../context/ProfileContextWrapper'


function getSetting(name) {
    let resp = localStorage.getItem("settings")
    let settings = JSON.parse(resp)
    return settings[name]
}

describe('<SettingsDialog>', function() {
    let close
    let profileContext
    beforeEach(() => {
        profileContext = {
            ...defaultProfile,
            options: ["localstorage", "default"],
            updateSetting: jest.fn((setting, value) => profileContext.settings[setting] = value),
            switchProfile: jest.fn(),
            makeNewProfile: jest.fn()
        }
        close = jest.fn()
        render(
            <ProfileContext.Provider value={profileContext}>
                <ThemeWrapper>
                    <SettingsDialog
                        open={true}
                        close={close}
                    />
                </ThemeWrapper>
            </ProfileContext.Provider>
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
        expect(profileContext.updateSetting).toHaveBeenCalledWith("showDotFiles", false)
    })
    it('should be able to use list display', function() {
        let switchButton = screen.getByRole('checkbox', { name: "use details view" })
        userEvent.click(switchButton)
        expect(profileContext.updateSetting).toHaveBeenCalledWith("useDetailsView", true)
    })
    it('should be able to toggle dark mode', function() {
        let switchButton = screen.getByRole('checkbox', { name: "use dark mode" })
        userEvent.click(switchButton)
        expect(profileContext.updateSetting).toHaveBeenCalledWith("useDarkMode", false)
    })
    it('should allow a user to select a profile from options', async function() {
        let textField = screen.getByRole('textbox', { name: "select profile" })
        userEvent.clear(textField)
        userEvent.type(textField, "localstorage")
        let swithButton = screen.getByRole('button', { name: "switch profiles" })
        userEvent.click(swithButton)
        await waitFor(() => {
            expect(profileContext.switchProfile).toHaveBeenCalled()
        })
    })
    it('should allow a user to create a new profile', async function() {
        let textField = screen.getByRole('textbox', { name: "select profile" })
        userEvent.type(textField, "test")
        let swithButton = screen.getByRole('button', { name: "switch profiles" })
        userEvent.click(swithButton)
        await waitFor(() => {
            expect(profileContext.makeNewProfile).toHaveBeenCalled()
        })
    })
})