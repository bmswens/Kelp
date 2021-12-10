// React
import React from 'react'

// testing library
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import Settings from './Settings'

describe('<Settings>', function() {
    beforeEach(() => {
        render(
            <Settings />
        )
    })
    it('should open a menu when clicked', function() {
        let button = screen.getByRole('button', { name: "settings" })
        userEvent.click(button)
        let menu = screen.getByRole('menu', { name: "settings menu"})
        expect(menu).not.toBeNull()
    })
})

describe('<Settings> menu', function() {
    beforeEach(() => {
        render(
            <Settings />
        )
        let button = screen.getByRole('button', { name: "settings" })
        userEvent.click(button)
    })
    it('should have a button to open the settings menus', function() {
        let button = screen.getByRole('menuitem', { name: "open settings" })
        userEvent.click(button)
        let dialog = screen.getByRole('dialog', { name: "Settings" })
        expect(dialog).not.toBeNull()
        let closeButton = screen.getByRole('button', { name: "close"})
        userEvent.click(closeButton)
    })
    it('should have a button to open help', function() {
        window.open = jest.fn()
        let button = screen.getByRole('menuitem', { name: 'help page' })
        userEvent.click(button)
        expect(window.open).toHaveBeenCalledWith('https://github.com/bmswens/Kelp/blob/master/docs/shortcuts-and-hotkeys.md', "_blank")
    })
    it('should have a button to open the SeaweedFS cluster info', function() {
        let button = screen.getByRole('menuitem', { name: "open cluster info" })
        userEvent.click(button)
        let dialog = screen.getByRole('dialog', { name: 'Cluster Info'})
        expect(dialog).not.toBeNull()
        let closeButton = screen.getByRole('button', { name: "close"})
        userEvent.click(closeButton)
    })
    it('should have a button to open the Kelp info', function() {
        let button = screen.getByRole('menuitem', { name: "open kelp info" })
        userEvent.click(button)
        let dialog = screen.getByRole('dialog', { name: 'Kelp Info'})
        expect(dialog).not.toBeNull()
        let closeButton = screen.getByRole('button', { name: "close"})
        userEvent.click(closeButton)
    })
})