import React from 'react'
import ProfileEdit from './settings/ProfileEdit'
import ChangePassword from './settings/ChangePassword'

const Settings = () => {
  return (
    <div className=' flex flex-col gap-10'>
        <ProfileEdit/>
        <ChangePassword/>
    </div>
  )
}

export default Settings