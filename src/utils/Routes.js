import { Route, Switch } from "react-router-dom";
import HomePage from "../components/pages/HomePage"
import LoginPage from "../components/pages/LoginPage";
import ErrorPage from "../components/pages/ErrorPage";

export default function Routes() {

    const systemError = localStorage.getItem("awsError")

    if (systemError) {
        localStorage.removeItem("awsError")
        return (<div>
            <ErrorPage/>
        </div>)
    } else {
        return (
            <Switch>
                <Route exact path="/home">
                    <HomePage/>
                </Route>
                <Route exact path="/">
                    <LoginPage/>
                </Route>
                <Route exact path="/error">
                    <ErrorPage/>
                </Route>
            </Switch>
        );
    }
}
