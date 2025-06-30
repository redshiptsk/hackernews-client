import { Content, Header } from 'antd/es/layout/layout'
import './App.css'
import { Layout } from 'antd'
import { HeaderText } from './Components/Layout/Header/HeaderText'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { NewsList } from './Components/NewsList/NewsList';
import { AppStoreProvider } from './stores/AppStore/AppStoreProvider';
import { FullNewsPage } from './Components/FullNewsPage/FullNewsPage';

function App() {
  return (
    <AppStoreProvider>
      <Router>
        <Layout style={{ width: '98vw' }}>
          <Header style={{ width: '98vw' }}>
            <HeaderText />
          </Header>
          <Switch>
            <Route path="/:id" children={<FullNewsPage />} />
            <Route path={`/`}>
              <Content style={{ width: '80vw', alignSelf: 'center' }}>
                <NewsList />
              </Content>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </AppStoreProvider>
  )
}


export default App


