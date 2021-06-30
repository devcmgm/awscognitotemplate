import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import {UserContextInterface} from "../../utils/UserContext";
import {useHistory} from "react-router-dom";
import LoginButton from "./LoginButton";

export default function CurrentUser() {

    const history = useHistory();
    const [authState, setAuthState] = useState<UserContextInterface>({
        isAuthenticated: false,
        currentRole: "unknown"
    });

    async function handleLogout(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log("Sign out")
        await Auth.signOut();
        history.push("/")
    }

    async function currentUser() {
        console.log("Called")
        try {
            const user = await Auth.currentUserInfo();
            setAuthState({isAuthenticated: true, currentRole: JSON.stringify(user.attributes)})
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let mounted = true;

        if (!authState.isAuthenticated && mounted) {

            currentUser();

            console.log("mounted");

        }
        return function cleanup() {
            console.log("clean")
            mounted = false;
        };
    })

    if (authState.isAuthenticated) {

        return (<div>
            USER:
            {authState.currentRole}
            <input
                id="loginDevUserBtn"
                type="submit"
                className="form-submit"
                value="sign out"
                onClick={handleLogout}
            />
        </div>)
    } else {
        return (<div>
            <LoginButton/>
        </div>)
    }
}
