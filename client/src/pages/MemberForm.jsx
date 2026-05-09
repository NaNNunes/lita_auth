import EditMemberForm from '../components/EditMemberForm';
import RegisterMemberForm from '../components/RegisterMemberForm';

import { useLocation, useParams } from 'react-router-dom';

const Registration = () => {
    const { memberEnrollment } = useParams();
    const { pathname } = useLocation();

    return (
        <div>
           {(pathname == "/registration") && <RegisterMemberForm/>}
           {(pathname == `/member/${memberEnrollment}`) && <EditMemberForm enrollment={memberEnrollment}/>}
        </div>
    )
}

export default Registration