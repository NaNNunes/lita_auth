const url = import.meta.env.VITE_LOCAL_API;

export function useMember(){

    const editMember = async(data = {}, enrollment) => {
        const options = {
            "method": 'PATCH',
            "headers": {"Content-Type":"application/json" },
            "body": JSON.stringify(data)
        }
        const res = await fetch(`${url}/members/edit/${enrollment}`, options);
        if(!res.ok){
            throw new Error(await res.json());
        }
        console.log(await res.json())
    }

    const newMember = async (data = {}) => {
        const options = {
            "method": "POST",
            "headers": {"Content-Type":"application/json" },
            "body": JSON.stringify(data)
        }
        const res = await fetch(`${url}/members/new`, options);
        if(!res.ok){
            throw new Error(await res.json());
        }
        console.log(await res.json());
    }

    const member = async (enrollment) => {
        if(!enrollment){
            return false;
        }
        const res = await fetch(`${url}/members/${enrollment}`);
        if(!res.ok){
            throw new Error(await res.json())
        }
        const data = await res.json();
        const {member_role, member_name, is_first_access} = data.result;

        return data.result;
    }

    const auth = async (data = {enrollment: null, password: null}) => {
        const options = {
            "method": "POST",
            "headers": {"Content-Type":"application/json" },
            "body": JSON.stringify(data)
        }
        const res = await fetch(`${url}/members/auth`, options);
        return await res.ok;
    }

    const populateLocalStorage = (enrollment, role, is_first_access) => {
        localStorage.setItem("member-enrollment", enrollment);
        localStorage.setItem("member-role", role);
        localStorage.setItem("first-access", is_first_access);
    }

    const clearLocalStorage = () => {
        localStorage.removeItem("member-enrollment");
        localStorage.removeItem("member-role");
        localStorage.removeItem("first-access");
    }

    return {editMember, newMember, member, auth, clearLocalStorage, populateLocalStorage}
}