import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import List from './List';
import Place from './Place';

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  List: {
    screen: List,
  },
  Place: {
    screen: Place
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