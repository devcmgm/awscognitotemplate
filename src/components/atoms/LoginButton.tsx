import React from "react";
import {Auth} from "aws-amplify";
import { useHistory } from "react-router-dom";

export default function LoginButton(props: any) {

    const history = useHistory();

    async function handleLogin(event: { preventDefault: () => void; }) {
        event.preventDefault();

        try {
            console.log("Button Click")

            const user = await Auth.signIn("stateuseractive@cms.hhs.local",
                "Passw0rd!");
            history.push("/home")
            console.log(JSON.stringify(user.attributes))
        } catch (error) {
            console.log("Error while logging in.", error);

        }

    }

    return (<div>
        <form>
            <input
                id="loginDevUserBtn"
                type="button"
                className="form-submit"
                value="Login"
                onClick={handleLogin}
            />

        </form>
    </div>)
}
