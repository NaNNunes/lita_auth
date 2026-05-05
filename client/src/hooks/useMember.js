const url = import.meta.env.VITE_LOCAL_API;

export function useMember(){
    const newMember = async (data = {}) => {
        try {
            const options = {
                "method": "POST",
                "headers": {"Content-Type":"application/json" },
                "body": JSON.stringify(data)
            }
            const res = await fetch(`${url}/members/new`, options);
        } catch (error) {
            console.log(error);
        }
    }

    const newAccess = async (data = {enrollment: null, password: null}) => {
        try {
            const options = {
                "method": "POST",
                "headers": {"Content-Type":"application/json" },
                "body": JSON.stringify(data)
            }
            const res = await fetch(`${url}/login`, options);
            if(!res.ok) throw new Error(res.json());
            localStorage.setItem("memberEnrollment", data.enrollment);
            const memberData = await res.json();
            return memberData;
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async (data) => {
        const options = {
            "method": "POST",
            "headers": {"Content-Type":"application/json" },
            "body": JSON.stringify(data)
        }
        const res = await fetch(`${url}/logout`)
    }

    return {newMember, newAccess, logout}
}