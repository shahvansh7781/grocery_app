import { registerRootComponent } from "expo";

import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppRegistry } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
const Root = () => {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51NzLkYSGxPqujkJLdJlYtw6eFhVeufvMOF2AXfYTkER1xRgYz4EiQps4GnUX76cAZeGaA2hSTBvTJDAcucZISfvW002afVwoeO">

      <App />
      </StripeProvider>
    </Provider>
  );
};
AppRegistry.registerComponent("main", () => Root);
