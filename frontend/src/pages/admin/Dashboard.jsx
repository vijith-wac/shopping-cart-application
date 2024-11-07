import UsersList from "../../components/admin/UsersList"
import AdminHeader from "../../components/admin/AdminHeader"

const Dashboard = ()=>{
    return(
        <div>
            <AdminHeader/>
            <h2>Dashboard</h2>
            <UsersList/>
        </div>
    )
}

export default Dashboard