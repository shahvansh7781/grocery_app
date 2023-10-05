import { registerRootComponent } from "expo";

import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppRegistry } from "react-native";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent("main", () => Root);
