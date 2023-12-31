import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Linking,
  SliderComponent,
  // ScrollView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

export default function Info() {
  const sliderOpen = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', '');
    } catch (e) {
      console.log('e ----->', e);
    }
    RNRestart.Restart();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/logo.png')
                : require('../assets/images/logomini.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>
            Thank you for using the CPL App!
          </Text>

          <Text
            style={{...styles.getStartedText, marginTop: 20, marginBottom: 20}}>
            For the best user experience in downloading files, please use an
            archive extractor App like ZArchiver (available on the Google Play
            Store).
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text style={styles.getStartedText}>Please contact</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('mailto:portalsupport@countyprestress.com')
              }
              style={{marginLeft: 5, marginRight: 5}}>
              <Text style={{...styles.helpLinkText, fontSize: 16}}>
                portalsupport@countyprestress.com
              </Text>
            </TouchableOpacity>
            {/* <Button onPress={() => Linking.openURL('mailto:support@example.com') }
              title="support@example.com" /> */}
            <Text style={styles.getStartedText}>with any questions.</Text>
          </View>
          <View style={{marginTop: 40}}>
            <Button
              onPress={() => sliderOpen()}
              title="Reset Launch Screen"></Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

Info.navigationOptions = {
  header: null,
};

async function handleHelpPress() {
  try {
    const url =
      'https://www.countyprestress.com/en/cmc-resources/team-member-directory';
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
        waitForRedirectDelay: 0,
      });
    } else Linking.openURL(url);
  } catch (error) {
    console.log('here');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
