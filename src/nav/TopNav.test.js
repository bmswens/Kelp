// React
import React from 'react'

// testing library
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import TopNav from './TopNav'
import { LocationContext } from '../context/LocationContextWrapper'

describe('<TopNav>', function() {
    let locationState
    beforeEach(function () {
        locationState = {
            currentLocation: "/",
            history: ["/past/locations"],
            updateLocation: jest.fn(),
            goBack: jest.fn(),
            refresh: jest.fn()
        }
        render(
            <LocationContext.Provider value={locationState}>
                <TopNav />
            </LocationContext.Provider>
        )
    })
    it('should display the current location', function() {
        let currentLocationDiv = screen.getByDisplayValue('/')
        expect(currentLocationDiv).not.toBeNull()
    })
    it('should allow the current location to be updated via button', function() {
        let currentLocationDiv = screen.getByDisplayValue('/')
        fireEvent.change(currentLocationDiv, { target: { value: '/new/location'}})
        let searchButton = screen.getByRole('button', { name: 'go to button'})
        fireEvent.click(searchButton)
        expect(locationState.updateLocation).toHaveBeenCalled()
    })
    it('should allow the current location to be updated via "enter" key', function() {
        let currentLocationDiv = screen.getByDisplayValue('/')
        fireEvent.change(currentLocationDiv, { target: { value: '/new/location' }})
        fireEvent.keyDown(currentLocationDiv, { key: "z" })
        fireEvent.keyDown(currentLocationDiv, { key: "Enter" })
        expect(locationState.updateLocation).toHaveBeenCalled()
    }) 
    it('should allow the user to go backwards through their location history', async function() {
        let currentLocationDiv = screen.getByDisplayValue('/')
        fireEvent.change(currentLocationDiv, { target: { value: '/new/location'}})
        let searchButton = screen.getByRole('button', { name: 'go to button'})
        fireEvent.click(searchButton)
        let backButton = screen.getByRole('button', { name: 'back button'})
        userEvent.click(backButton)
        await waitFor(() => {
            expect(locationState.goBack).toHaveBeenCalled()
        })
    })
    it('should allow a user to return to "home" location', function() {
        let currentLocationDiv = screen.getByDisplayValue('/')
        fireEvent.change(currentLocationDiv, { target: { value: '/new/location'}})
        let searchButton = screen.getByRole('button', { name: 'go to button'})
        fireEvent.click(searchButton)
        let homeButton = screen.getByRole('button', { name: 'home button'})
        fireEvent.click(homeButton)
        expect(locationState.updateLocation).toHaveBeenCalled()
    })
    it('should have a shortcut to focus location bar', async function() {
        fireEvent.keyDown(document, { key: "/", ctrLKey: true})
        userEvent.type(document.activeElement, 'home/bmswens') 
        userEvent.type(document.activeElement, '{enter}')
        await waitFor(() => {
            expect(locationState.updateLocation).toHaveBeenCalledWith('/home/bmswens')
        })
    })
    it('should have a shortcut to focus location bar', async function() {
        fireEvent.keyDown(document, { key: "/", altKey: true})
        userEvent.type(document.activeElement, 'home/otherLocation') 
        userEvent.type(document.activeElement, '{enter}')
        await waitFor(() => {
            expect(locationState.updateLocation).toHaveBeenCalledWith('/home/otherLocation')
        })
    })
})