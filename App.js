import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import List from './List';

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  List: {
    screen: List,
  },
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle :{
      backgroundColor: '#FA9D5C'
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold',
    }
  }
}
);

const App = createAppContainer(MainNavigator);

export default App;