import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages";
import DashboardWrapper from "./dashboard/layout";
import MediasPage from "./pages/admin/medias";
import ServersPage from "./pages/admin/servers";
import ContactsPage from "./pages/admin/contacts";
import SettingsPage from "./pages/admin/settings";
import TerminalPage from "./pages/admin/terminal";
import RecycleBinPage from "./pages/admin/recycle-bin";
import DocumentationPage from "./pages/admin/documentation";
import { PriceProvider } from "./providers/PriceProvider";
import { FeathersProvider } from "./providers/FeathersProvider";



function App() {
  return (
    <Router>
      <FeathersProvider>
        <DashboardWrapper>
          <PriceProvider>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/admin/contacts">
                <ContactsPage />
              </Route>
              <Route exact path="/admin/documentation">
                <DocumentationPage />
              </Route>
              <Route exact path="/admin/medias">
                <MediasPage />
              </Route>
              <Route exact path="/admin/recycle-bin">
                <RecycleBinPage />
              </Route>
              <Route exact path="/admin/servers">
                <ServersPage />
              </Route>
              <Route exact path="/admin/settings">
                <SettingsPage />
              </Route>
              <Route exact path="/admin/terminal">
                <TerminalPage />
              </Route>
            </Switch>
          </PriceProvider>
        </DashboardWrapper>
      </FeathersProvider>
    </Router>
  );
}

export default App;
