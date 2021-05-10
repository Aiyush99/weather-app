import React from 'react'
import { View, Text } from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import CurrentWeather from "./components/CurrentWeather";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import {createStackNavigator} from "@react-navigation/stack"
import Search from "./components/Search";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator ()  {
  return (
  
     <Tab.Navigator
             tabBarOptions={{
            style:{borderTopWidth:0},
              activeBackgroundColor:"#081a24",
              inactiveBackgroundColor:"#081a24",


            }}
      initialRouteName="current-weather"
      >
  
       <Tab.Screen name="current-weather"component={CurrentWeather}
       options={{
         tabBarLabel:"",
         tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons style={{marginTop:10,color:"#405573"}} name={focused ? 'home' : 'home-outline'} size={32} />
        ) 
       }}
       />

       <Tab.Screen name="search"component={Search}
       options={{
         tabBarLabel:"",
         tabBarIcon: ({focused}) => (
          <Ionicons style={{marginTop:10,color:"#405573"}} name={focused ? 'md-search' : 'ios-search'} size={28} />
        ) 
       }}
       />
     </Tab.Navigator>
  )
}

const App = ()=>{
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen  options={{headerStatusBarHeight:-35,headerTitle:false,headerTintColor:"#fff"}} name="tab"component={TabNavigator}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App
