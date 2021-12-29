// React
import React from 'react'

// testing library
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import SettingsDialog from './SettingsDialog'
import ContextWrappers from '../context/ContextWrappers'

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
})