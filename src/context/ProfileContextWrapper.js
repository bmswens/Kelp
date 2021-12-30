// React
import React from 'react'

// local storage
import useLocalStorage from '@rehooks/local-storage'

// custom
import Filer from '../seaweed/filer'
import { getName } from '../seaweed/file'


// default and context creation
const defaultProfile = {
    settings: {
        showDotFiles: true,
        useDetailsView: false,
        useDarkMode: true,
    },
    current: "localstorage",
    bookmarks: [],
    options: []
}

const ProfileContext = React.createContext(defaultProfile)

function ProfileContextWrapper(props) {

    const [profile, setProfile] = React.useState(defaultProfile)
    const [options, setOptions] = React.useState([])
    const [selectedProfile, setSelectedProfile] = useLocalStorage("profile", { profile: "localstorage"})

    // for loading
    async function getProfiles() {
        let output = []
        let profileFiles = await Filer.getFiles('/.kelp/profiles')
        for (let f of profileFiles) {
            let name = getName(f.FullPath)
            if (name.includes('.json')) {
                output.push(name.replace('.json', ''))
            }
        }
        setOptions(output)
    }

    async function loadProfile() {
        if (!(selectedProfile === "localstorage")) {
            let content = await Filer.getContent(`/.kelp/profiles/${selectedProfile}.json`)
            const { settings, bookmarks } = JSON.parse(content)
            setProfile({
                ...profile,
                settings,
                bookmarks
            })
        }
    }

    React.useEffect(() => {
        getProfiles()
        loadProfile()
    }, [selectedProfile.profile])

    // for updating
    async function switchProfile(name) {
        setSelectedProfile({ profile: name})
    }

    async function updateSetting(setting, value) {
        
    }

    async function makeNewProfile(name) {

    } 

    return (
        <ProfileContext.Provider
            value={{
                ...profile,
                options,
                current: selectedProfile.profile,
                switchProfile,
                updateSetting,
                makeNewProfile
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    )

}

export default ProfileContextWrapper
export {
    defaultProfile,
    ProfileContext
}