import LoginForm from '../components/forms/LoginForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAccess } from '../hooks/handleAccess';
import { useSession } from '../hooks/useSession';
import { useMember } from '../hooks/useMember';

const Login = () => {
  const { member } = useMember();
  const { handleLogin, handleLogout } = handleAccess();
  const { session } = useSession();
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const login = async (credential) => {
    const data = await handleLogin(credential);
    setIsLogged(true);
    handleNavigate(data);
  }
  const logout = async (credential) => {
    const isOut = await handleLogout(credential);
    setIsLogged(!isOut);
    location.reload();
  }

  const handleNavigate = (data = {isLogged : false, member_role : 0, is_first_access : 0, member_enrollment : ""}) => {
    console.log(data);
    if(!isLogged) return;
    if(isFirstAccess == 1){
      navigate(`/member/${enrollment}`);
      return;
    }
    if(memberRole != "0"){
      navigate("/home");
      return;
    }
  }

  useEffect(()=>{
    async function fetchData(){
      const enrollment = localStorage.getItem("member-enrollment");
      const isLogged = await session(enrollment);
      setIsLogged(isLogged);
      if(!isLogged) return;
      const data = await member(enrollment);
      handleNavigate(data);
      // criar um context
    }
    fetchData();
  },[]);
  
  return (
    <div>
      <LoginForm 
        handleLogin={login} 
        handleLogout={logout} 
        isLogged={isLogged}/>
    </div>
  )
}

export default Login