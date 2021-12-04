// React
import React from 'react'

// testing library
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// to test
import TopNav from './TopNav'
import LocationContextWrapper from '../context/LocationContextWrapper'

describe('<TopNav>', function() {
    beforeEach(function () {
        render(
            <LocationContextWrapper>
                <TopNav />
            </LocationContextWrapper>
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
        let newLocationDiv = screen.getByDisplayValue('/new/location')
        expect(newLocationDiv).not.toBeNull()
    })
    it('should allow the current location to be updated via "enter" key', function() {
        let currentLocationDiv = screen.getByDisplayValue('/')
        fireEvent.change(currentLocationDiv, { target: { value: '/new/location' }})
        fireEvent.keyDown(currentLocationDiv, { key: "z" })
        fireEvent.keyDown(currentLocationDiv, { key: "Enter" })
        let newLocationDiv = screen.getByDisplayValue('/new/location')
        expect(newLocationDiv).not.toBeNull()
    }) 
    it('should allow the user to go backwards through their location history', async function() {
        let currentLocationDiv = screen.getByDisplayValue('/')
        fireEvent.change(currentLocationDiv, { target: { value: '/new/location'}})
        let searchButton = screen.getByRole('button', { name: 'go to button'})
        fireEvent.click(searchButton)
        let backButton = screen.getByRole('button', { name: 'back button'})
        fireEvent.click(backButton)
        let newLocationDiv = screen.getByDisplayValue('/')
        expect(newLocationDiv).not.toBeNull()
    })
    it('should allow a user to return to "home" location', function() {
        let currentLocationDiv = screen.getByDisplayValue('/')
        fireEvent.change(currentLocationDiv, { target: { value: '/new/location'}})
        let searchButton = screen.getByRole('button', { name: 'go to button'})
        fireEvent.click(searchButton)
        let homeButton = screen.getByRole('button', { name: 'home button'})
        fireEvent.click(homeButton)
        let newLocationDiv = screen.getByDisplayValue('/')
        expect(newLocationDiv).not.toBeNull()
    })
})