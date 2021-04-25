import React from 'react'
import { Route, Switch } from 'react-router'
import Dashboard from '../Components/Dashboard'
import Login from '../Components/Login/Login'

function Router() {
    return (
        <Switch>
            <Route path="/" exact>
                < Dashboard />
            </Route>
             <Route path="/User/:UserName/:ChatId">
                < Dashboard />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
        </Switch>
    )
}

export default Router
