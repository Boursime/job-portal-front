import CompanyDashboard from "./company/CompanyDashboard"
import AdminDashboard from "./admin/AdminDashboard"
import JobSeekerDashobard from "./job_seeker/JobSeekerDashboard"
import { ADMIN,JOB_SEEKER,EMPLOYER } from "@/constants/userRole"
import {useAuth} from "@/contexts/AuthContext"
import { NotFoundPage } from "./system/NotFoundPage"
const Dashboard = ()=>
{
    const {  user } = useAuth();

    if(user?.role === ADMIN){
        return( <AdminDashboard/>)
    }

    else if(user?.role === JOB_SEEKER)
    {
        return (<JobSeekerDashobard/>)
    }

    else if(user?.role ===EMPLOYER)
    {
        return (<CompanyDashboard/>)
    }
    return(
        <NotFoundPage/>
    )
}
export default Dashboard