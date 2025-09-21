
import { getProfile } from './_action/Profile'
import Form from './_components/Form'

const ProfilePage = async () => {

    const profile = await getProfile()

    console.log(profile)

    return (
        <div>
            {profile ? <Form profile={profile} /> : <div>No Information Provided</div>}
        </div>
    )
}

export default ProfilePage