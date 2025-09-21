import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UserTable from './_components/UserTable';
import { getUsersByAdmin } from './_action/Users';

const UsersPage = async () => {

    const token = (await cookies()).get('jwtToken')?.value

    if (!token) {
        redirect('/')
    }

    const users = await getUsersByAdmin()

    const usersLength = users?.length as number
    console.log(usersLength)

    return (
        <div className="my-10">
            <UserTable token={token} usersLength={usersLength} />
        </div>
    )
}

export default UsersPage