import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Button} from 'react-native';
import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import ImportData from './src/lessons/DataWithFireBase/index';

// create a component
const App = () => {
  const pushNoti = () => {
    PushNotification.localNotification({
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  };
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };

      localNotificationService.showNotification(
        0,
        notify.notification.title,
        notify.notification.body,
        notify,
        options,
      );
    }

    async function onOpenNotification(notify) {
      console.log('notify', notify);
    }

    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  return <ImportData />;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default App;
