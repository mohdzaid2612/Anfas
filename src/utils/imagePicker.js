import {Platform, Alert, PermissionsAndroid} from 'react-native'
import Permissions, {PERMISSIONS, RESULTS} from 'react-native-permissions'
import ImagePicker from 'react-native-image-crop-picker'

const checkAllAndroidPermissions = async () => {
    try {
        await PermissionsAndroid.requestMultiple
        ([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);
        if ((await PermissionsAndroid.check('android.permission.CAMERA')) &&
            (await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE')) &&
            (await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE'))) {
            console.log('You can use the camera');
            return true;
        } else {
            console.log('all permissions denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
    }
}

/** This function will open Image Gallery or Camera based on task type.
 * GALLERY for opening image selection
 * CAMERA for opening camera
 * 
 * @param {String} task 
 * @param {Function} responseAction 
 */
export const showImagePicker = async (task, responseAction) => {
    if (Platform.OS === 'android') {
        await checkAllAndroidPermissions();
    }
    Permissions.check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ).then(response => {
        if (response === RESULTS.GRANTED) {
            imageTask(task, responseAction)
        }
        else if (response === RESULTS.DENIED) {
            Permissions.request(
                Platform.OS === 'ios'
                  ? PERMISSIONS.IOS.PHOTO_LIBRARY
                  : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              ).then(response => {
                if (response === RESULTS.GRANTED) {
                  showImagePicker(task, responseAction)
                }
              })
        }
      })
      .catch(err => {
        Alert.alert(
            'Permission denied',
            'You declined the permission to access to your photo.',
            [{text: 'OK'}],
            {
              cancelable: false,
            },
          )
      })
}

const imageTask = (task, appendForUpload) => {
    if (task === "CAMERA") {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
        }).then(image => {
          if (image) {
            const {
              mime,
              path,
              size
            } = image
            appendForUpload([
              {
                uri: path,
                type: mime,
                size:size
              }
            ])
          }
        })
      }
      else if (task === "GALLERY") {
        ImagePicker.openPicker({
          multiple: true
        }).then(images => {
          if (images) {
            const updatedImages = images.map(image => {
              
              const {
                mime,
                path,
                size
              } = image
              return {
                uri: path,
                type: mime,
                size:size
              }
            })
            appendForUpload(updatedImages)
          }
        })
      }
}