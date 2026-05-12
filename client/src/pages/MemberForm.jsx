import EditMemberForm from '../components/forms/edit/EditForm';
import RegisterMemberForm from '../components/forms/RegisterMemberForm';

import { useLocation, useParams } from 'react-router-dom';

const MemberForm = () => {
    const { memberEnrollment } = useParams();
    const { pathname } = useLocation();

    return (
        <div>
           {(pathname == "/registration") && <RegisterMemberForm/>}
           {(pathname == `/member/${memberEnrollment}`) && 
            <EditMemberForm enrollment={memberEnrollment}/>}
        </div>
    )
}

export default MemberForm