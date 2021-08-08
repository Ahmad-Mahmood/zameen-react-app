import {
    Switch,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
import Detail from "../components/list/detail"
import Home from "../components/home"

const Routes = ({ atBottom }) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" 
                    render={(props) => (
                        <Home {...props} atBottom={atBottom}/>
                    )}
                />
                <Route exact path="/:id" component={Detail} />
            </Switch>
        </Router>
    );
}

export default Routes