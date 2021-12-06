// React
import React from 'react'

// testing library
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import KelpInfoDialog from './KelpInfoDialog'

describe('<KelpInfoDialog>', function() {
    let close
    beforeEach(() => {
        close = jest.fn()
        render(
            <KelpInfoDialog
                open={true}
                close={close}
            />
        )
    })
    it('should display relevant info', function() {
        let requiredKeys = [
            /.*Kelp Version*/,
            /.*React Version.*/
        ]
        for (let key of requiredKeys) {
            let text = screen.getByText(key)
            expect(text).not.toBeNull()
        }
    })
    it('should have a button to go to the github page', function() {
        window.open = jest.fn()
        let gitButton = screen.getByRole('button', { name: "github" })
        userEvent.click(gitButton)
        expect(window.open).toHaveBeenCalledWith("https://github.com/bmswens/Kelp", "_blank")
    })
    it('should have a button to report bugs', function() {
        window.open = jest.fn()
        let twitterButton = screen.getByRole('button', { name: "report bugs" })
        userEvent.click(twitterButton)
        expect(window.open).toHaveBeenCalledWith('https://github.com/bmswens/Kelp/issues', "_blank")
    })
    it('should be able to close', function() {
        let closeButton = screen.getByRole('button', { name: "close" })
        userEvent.click(closeButton)
        expect(close).toHaveBeenCalled()
    })
})