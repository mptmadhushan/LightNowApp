import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabStack from './BottomStack';
import Routes from '../Routes';
import MenuSelection from '../../Screens/MenuSelection/index';
import LightNowAssistant from '../../Screens/LightNowAssistant/index';
import OrderDetails from '../../Screens/OrderDetails/index';
import OFFERSANDCOUPONS from '../../Screens/OffersAndCo/index';
import OffersNearMe from '../../Screens/OffersNearMe/index';
import PendingDeliveryList from '../../Screens/PendingDeliveryList/index';
import CancelledOrders from '../../Screens/CancelledOrders/index';
import CompletedOrders from '../../Screens/CompletedOrders/index';
import PendingDelivery from '../../Screens/PendingDelivery/index';
import ProductSearch from '../../Screens/ProductSearch/index';
import ProductList from '../../Screens/ProductList/index';
import ImageSearch from '../../Screens/ImageSearch/index';
import ImageSearchResult from '../../Screens/PlaceOrder/index';
import Profile from '../../Screens/Profile/index';
import PlaceOrder from '../../Screens/PlaceOrder/index';
import OrderConfirmVoice from '../../Screens/OrderConfirmVoice/index';
import VoiceSearch from '../../Screens/VoiceSearch/index';
import ImageSearchResultNew from '../../Screens/ImageSearchResult/index';
import OCROrderConfirm from '../../Screens/OCROrderConfirm/index';
import ProductListVoice from '../../Screens/ProductListVoice/index';
const Stack = createStackNavigator();

export default (props) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name={Routes.HOME_TABS}
        options={{headerShown: false}}
        component={BottomTabStack}
      />
      <Stack.Screen
        options={{title: 'WHERE DO YOU NEED TO GO'}}
        name="language-success"
        component={MenuSelection}
      />
      <Stack.Screen
        options={{title: 'LightNow Assistant'}}
        name="assistant"
        component={LightNowAssistant}
      />
      <Stack.Screen
        options={{title: 'Order Details'}}
        name="order-menu"
        component={OrderDetails}
      />
      <Stack.Screen
        options={{title: 'OFFERS AND COUPONS'}}
        name="list-offer-success"
        component={OFFERSANDCOUPONS}
      />
      <Stack.Screen
        options={{title: 'OFFERS NEAR ME'}}
        name="offer-success"
        component={OffersNearMe}
      />
      <Stack.Screen
        options={{title: 'Pending Delivery'}}
        name="PendingDeliveryList"
        component={PendingDeliveryList}
      />
      <Stack.Screen
        options={{title: 'Cancelled Orders'}}
        name="order-cancelled"
        component={CancelledOrders}
      />
      <Stack.Screen
        options={{title: 'Completed Orders'}}
        name="order-completed"
        component={CompletedOrders}
      />
      <Stack.Screen
        options={{title: 'Pending Delivery'}}
        name="order-pending"
        component={PendingDelivery}
      />
      <Stack.Screen
        options={{title: 'Product Search'}}
        name="create-list"
        component={ProductSearch}
      />
      <Stack.Screen
        options={{title: 'Product Finalize'}}
        component={ProductList}
        name="ProductList"
      />
      <Stack.Screen
        options={{title: 'Image Search'}}
        component={ImageSearch}
        name="image-list"
      />
      <Stack.Screen
        options={{title: 'Image Search Result'}}
        component={ImageSearchResult}
        name="ImageSearchResult"
      />
      <Stack.Screen
        options={{title: 'Profile'}}
        component={Profile}
        name="profile"
      />
      <Stack.Screen
        options={{title: 'check out'}}
        component={PlaceOrder}
        name="check-out"
      />
      <Stack.Screen
        options={{title: 'Place Order Voice'}}
        component={OrderConfirmVoice}
        name="place-order"
      />
      <Stack.Screen
        options={{title: 'Voice Search'}}
        component={VoiceSearch}
        name="voice-search"
      />
      <Stack.Screen
        options={{title: 'Image Search'}}
        component={ImageSearchResultNew}
        name="ImageSearchResultNew"
      />
      <Stack.Screen
        options={{title: 'Place Order'}}
        component={OCROrderConfirm}
        name="OCROrderConfirm"
      />
      <Stack.Screen
        options={{title: 'Product List'}}
        component={ProductListVoice}
        name="search-save"
      />
    </Stack.Navigator>
  );
};
