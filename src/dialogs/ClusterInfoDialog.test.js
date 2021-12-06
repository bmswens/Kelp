// React
import React from 'react'

// testing library
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import ClusterInfoDialog from './ClusterInfoDialog'
import { mockMaster } from '../seaweed/master.test'

describe('<ClusterInfoDialog>', function() {
    // can't figure out how to await initial load
    jest.spyOn(console, 'error').mockImplementation(() => {})
    let close
    beforeEach(async () => {
        close = jest.fn()
        mockMaster()
        render(
            <ClusterInfoDialog
                open={true}
                close={close}
            />
        )
    })
    it('should be able to close', function() {
        let closeButton = screen.getByRole('button', { name: "close" })
        userEvent.click(closeButton)
        expect(close).toHaveBeenCalled()
    })
    it('should display the relevant info', function() {
        let requiredKeys = [
            /.*Version.*/,
            /.*Datacenters.*/,
            /.*Racks.*/,
            /.*Nodes.*/,
            /.*Storage Used.*/
        ]
        for (let key of requiredKeys) {
            let text = screen.getByText(key)
            expect(text).not.toBeNull()
        }
    })
    it('should link to the Github and Twitter for SeaweedFS', function() {
        window.open = jest.fn()
        let gitButton = screen.getByRole('button', { name: "github" })
        userEvent.click(gitButton)
        expect(window.open).toHaveBeenCalledWith("https://github.com/chrislusf/seaweedfs", "_blank")
        window.open = jest.fn()
        let twitterButton = screen.getByRole('button', { name: "twitter" })
        userEvent.click(twitterButton)
        expect(window.open).toHaveBeenCalledWith('https://twitter.com/SeaweedFS', "_blank")
    })
})