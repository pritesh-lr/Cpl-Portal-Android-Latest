import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import styles from './DashBoardStyle';
import {NavigationContainer} from '@react-navigation/native';
// import useLinking from './navigation/useLinking';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import AppSlider from './screen/AppSlider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [sliderView, setSliderView] = useState(undefined);
  const containerRef = React.useRef();
  // const {getInitialState} = useLinking(containerRef);

  React.useEffect(() => {
    async function fetchMyAPI() {
      SplashScreen.hide();
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          //console.log("value use effect---->", value);
          setSliderView(value);
        }
        if (value === 'false') {
          setWebViewVisible(true);
        }
      } catch (e) {
        console.log('e useEffect ------>', e);
      }
    }

    fetchMyAPI();
  }, []);

  //console.log("sliderView ---->", sliderView);

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      {webViewVisible && (
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen
              name="County Prestress"
              component={BottomTabNavigator}
              options={{headerTitleAlign: 'center'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {/* <Dashboard /> */}
      {!webViewVisible && sliderView !== 'false' && (
        <AppSlider onSignInClick={e => setWebViewVisible(e)} />
      )}
    </View>
  );
};

export default App;
