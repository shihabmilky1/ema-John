import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetails/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

export const userContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
          <PrivetRoute path="/shop">
            <Shop></Shop>
          </PrivetRoute>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivetRoute path="/manage" >
            <Inventory></Inventory>
          </PrivetRoute>
          <Route path="/login" >
            <Login></Login>
          </Route>
          <PrivetRoute path="/shipment" >
            <Shipment></Shipment>
          </PrivetRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
