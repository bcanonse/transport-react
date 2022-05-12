import { Route, Switch, Redirect } from "react-router-dom";
import PsBuildService from '../layouts/pages/PsBuildService';
import PsCeramics from '../layouts/pages/PsCeramics';
import PsExportMp from '../layouts/pages/PsExportMp';
import PsTransportMp from '../layouts/pages/PsTransportMp';
import PsMachineBuild from '../layouts/pages/PsMachineBuild';
import PsMiningExtraction from '../layouts/pages/PsMiningExtraction';
import NavbarSite from '../components/Navbars/NavBarSite';
import FooterSite from '../components/Footers/FooterSite';

const SitePages = () => {
    return (
        <>
            <NavbarSite />
            <Switch>
                <Route path='/business/transport-mp' exact component={PsTransportMp} />
                <Route path='/business/export-mp' exact component={PsExportMp} />
                <Route path='/business/build' exact component={PsBuildService} />
                <Route path='/business/build-machines' exact component={PsMachineBuild} />
                <Route path='/business/mining-extraction' exact component={PsMiningExtraction} />
                <Route path='/business/ceramics' exact component={PsCeramics} />
                <Redirect from="/business" to="/" />
            </Switch>
            <FooterSite />
        </>
    )
}

export default SitePages;