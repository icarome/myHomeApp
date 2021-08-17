import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Header from './components/Header';

import Catalog from './pages/Catalog';

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                  headerShown: false,
                  cardStyle: {backgroundColor: '#313746'},
              }}
              initialRouteName="Catalog"
            >
                <Stack.Screen
                    name="Catalog"
                    component = {Catalog}
                    options = {{
                        headerShown: true,
                        headerTransparent: false,
                        headerTitle: () => <Header/>,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )


}