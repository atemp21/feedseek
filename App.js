import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import List from './List';
import Place from './Place';
import Policy from './Policy';

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  List: {
    screen: List,
  },
  Place: {
    screen: Place
  },
  Policy: {
    screen: Policy
  }
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle :{
      backgroundColor: '#009BDB'
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