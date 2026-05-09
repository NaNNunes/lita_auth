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
        const res = await fetch(`${url}/members/${enrollment}`);
        if(!res.ok){
            throw new Error(await res.json())
        }
        const memberData = await res.json();

        // localStorage.removeItem("memberEnrollment");
        // localStorage.removeItem("memberRole");
        // localStorage.removeItem("memberName");

        // localStorage.setItem("memberEnrollment", enrollment);
        // localStorage.setItem("memberRole", memberData.result.member_role);
        // localStorage.setItem("memberName", memberData.result.member_name);

        return memberData.result;
    }

    const login = async (data = {enrollment: null, password: null}) => {
        const options = {
            "method": "POST",
            "headers": {"Content-Type":"application/json" },
            "body": JSON.stringify(data)
        }
        const res = await fetch(`${url}/logout`, options);

        if(!res.ok) {
            throw new Error(await res.json());
        }
        return res.ok;
    }

    const logout = async (data) => {
        const options = {
            "method": "POST",
            "headers": {"Content-Type":"application/json" },
            "body": JSON.stringify(data)
        }
        const res = await fetch(`${url}/logout`)
    }

    return {editMember, newMember, member, login, logout}
}