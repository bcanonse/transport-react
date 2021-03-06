import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";

// views without layouts
import HomeSite from "views/HomeSite";
import SitePages from "layouts/SitePages";
import Auth from "layouts/Auth";
import AppClient from "layouts/AppClient";
import AppDashboard from "layouts/AppDashboard";
import NegociosAcceso from "views/app/NegociosAcceso";
import { StatusOrder } from "views/StatusOrder";


export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                {/* add routes with layouts */}
                <Route path="/admin" component={Admin} />
                <Route path="/app" component={AppClient} />
                <Route path="/companies" exact component={NegociosAcceso} />
                <Route path="/dashboard" component={AppDashboard} />
                <Route path="/auth" component={Auth} />
                <Route path="/status-order" exact component={StatusOrder} />
                <Route path="/" exact component={HomeSite} />
                <Route path="/business" component={SitePages} />
                {/* add redirect for first page */}
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    )
}