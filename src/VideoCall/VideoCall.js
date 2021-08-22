import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  OT,
  OTSession,
  OTPublisher,
  OTSubscriber,
  OTSubscriberView,
} from 'opentok-react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const mainSubscribersResolution = {width: 1280, height: 720};
const secondarySubscribersResolution = {width: 352, height: 288};

class VideoCall extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '47298774';
    this.sessionId =
      '1_MX40NzI5ODc3NH5-MTYyOTUzODA4NjQ1NX4weEdoN0M4bHlFTVNnOGFCNTlmaGJjUFB-UH4';
    this.token =
      'T1==cGFydG5lcl9pZD00NzI5ODc3NCZzaWc9ODIyMmMzZTMwMzgzOGYyY2I1ODdiZGEzYmQxNjQ4NTMxYWU3MzI4YTpzZXNzaW9uX2lkPTFfTVg0ME56STVPRGMzTkg1LU1UWXlPVFV6T0RBNE5qUTFOWDR3ZUVkb04wTTRiSGxGVFZObk9HRkNOVGxtYUdKalVGQi1VSDQmY3JlYXRlX3RpbWU9MTYyOTUzODEwMiZub25jZT0wLjM3NDYzMTc3NjQzODI2MDczJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2MzIxMzAxMDAmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
    this.state = {
      subscriberIds: [], // Array for storing subscribers
      localPublishAudio: true, // Local Audio state
      localPublishVideo: true, // Local Video state
      joinCall: false, // State variable for storing success
      streamProperties: {}, // Handle individual stream properties,
      mainSubscriberStreamId: null,
      frontCamera: true,
    };

    this.sessionEventHandlers = {
      streamCreated: event => {
        const streamProperties = {
          ...this.state.streamProperties,
          [event.streamId]: {
            subscribeToAudio: true,
            subscribeToVideo: true,
          },
        };
        this.setState({
          streamProperties,
          subscriberIds: [...this.state.subscriberIds, event.streamId],
        });
        console.log('streamCreated', this.state);
      },
      streamDestroyed: event => {
        const indexToRemove = this.state.subscriberIds.indexOf(event.streamId);
        const newSubscriberIds = this.state.subscriberIds;
        const streamProperties = {...this.state.streamProperties};
        if (indexToRemove !== -1) {
          delete streamProperties[event.streamId];
          newSubscriberIds.splice(indexToRemove, 1);
          this.setState({subscriberIds: newSubscriberIds});
        }
      },
      error: error => {
        console.log('session error:', error);
      },
      otrnError: error => {
        console.log('Session otrnError error:', error);
      },
      sessionDisconnected: () => {
        this.setState({
          streamProperties: {},
          subscriberIds: [],
        });
      },
    };

    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log('Publisher stream created!', event);
      },
      streamDestroyed: event => {
        console.log('Publisher stream destroyed!', event);
      },
      audioLevel: event => {
        /* console.log('AudioLevel', typeof event); */
      },
    };

    this.subscriberEventHandlers = {
      connected: () => {
        console.log('[subscriberEventHandlers - connected]');
      },
      disconnected: () => {
        console.log('[subscriberEventHandlers - disconnected]');
      },
      error: error => {
        console.log('subscriberEventHandlers error:', error);
      },
    };
  }

  toggleAudio = () => {
    let publishAudio = this.state.localPublishAudio;
    this.publisherProperties = {
      ...this.publisherProperties,
      publishAudio: !publishAudio,
    };
    this.setState({
      localPublishAudio: !publishAudio,
    });
  };

  toggleCameraPosition = () => {
    this.setState({frontCamera: !this.state.frontCamera});
  };

  toggleVideo = () => {
    let publishVideo = this.state.localPublishVideo;
    this.publisherProperties = {
      ...this.publisherProperties,
      publishVideo: !publishVideo,
    };
    this.setState({
      localPublishVideo: !publishVideo,
    });
    console.log('Video toggle', this.publisherProperties);
  };

  joinCall = () => {
    const {joinCall} = this.state;
    if (!joinCall) {
      this.setState({joinCall: true});
    }
  };

  endCall = () => {
    const {joinCall} = this.state;
    if (joinCall) {
      this.setState({joinCall: !joinCall});
    }
  };

  /**
   * // todo check if the selected is a publisher. if so, return
   * @param {*} subscribers
   */
  handleSubscriberSelection = (subscribers, streamId) => {
    console.log('handleSubscriberSelection', streamId);
    let subscriberToSwap = subscribers.indexOf(streamId);
    let currentSubscribers = subscribers;
    let temp = currentSubscribers[subscriberToSwap];
    currentSubscribers[subscriberToSwap] = currentSubscribers[0];
    currentSubscribers[0] = temp;
    this.setState(prevState => {
      const newStreamProps = {...prevState.streamProperties};
      for (let i = 0; i < currentSubscribers.length; i += 1) {
        if (i === 0) {
          newStreamProps[currentSubscribers[i]] = {
            ...prevState.streamProperties[currentSubscribers[i]],
          };
          newStreamProps[
            currentSubscribers[i]
          ].preferredResolution = mainSubscribersResolution;
        } else {
          newStreamProps[currentSubscribers[i]] = {
            ...prevState.streamProperties[currentSubscribers[i]],
          };
          newStreamProps[
            currentSubscribers[i]
          ].preferredResolution = secondarySubscribersResolution;
        }
      }
      console.log('mainSubscriberStreamId', streamId);
      console.log('streamProperties#2', newStreamProps);
      return {
        mainSubscriberStreamId: streamId,
        streamProperties: newStreamProps,
      };
    });
  };

  handleScrollEnd = (event, subscribers) => {
    console.log('handleScrollEnd', event.nativeEvent); // event.nativeEvent.contentOffset.x
    console.log('handleScrollEnd - events', event.target); // event.nativeEvent.contentOffset.x
    let firstVisibleIndex;
    if (
      event &&
      event.nativeEvent &&
      !isNaN(event.nativeEvent.contentOffset.x)
    ) {
      firstVisibleIndex = parseInt(
        event.nativeEvent.contentOffset.x / (dimensions.width / 2),
        10,
      );
      console.log('firstVisibleIndex', firstVisibleIndex);
    }
    this.setState(prevState => {
      const newStreamProps = {...prevState.streamProperties};
      if (firstVisibleIndex !== undefined && !isNaN(firstVisibleIndex)) {
        for (let i = 0; i < subscribers.length; i += 1) {
          if (i === firstVisibleIndex || i === firstVisibleIndex + 1) {
            newStreamProps[subscribers[i]] = {
              ...prevState.streamProperties[subscribers[i]],
            };
            newStreamProps[subscribers[i]].subscribeToVideo = true;
          } else {
            newStreamProps[subscribers[i]] = {
              ...prevState.streamProperties[subscribers[i]],
            };
            newStreamProps[subscribers[i]].subscribeToVideo = false;
          }
        }
      }
      return {streamProperties: newStreamProps};
    });
  };

  renderSubscribers = subscribers => {
    console.log('renderSubscribers', subscribers);
    console.log('this.state.subscriberIds', this.state.subscriberIds);
    console.log(
      'this.state.mainSubscriberStreamId',
      this.state.mainSubscriberStreamId,
    );
    if (this.state.mainSubscriberStreamId) {
      subscribers = subscribers.filter(
        sub => sub !== this.state.mainSubscriberStreamId,
      );
      subscribers.unshift(this.state.mainSubscriberStreamId);
    }
    console.log('renderSubscribers - sorted', subscribers);
    return subscribers.length > 1 ? (
      <>
        <View style={styles.mainSubscriberStyle}>
          <TouchableOpacity
            onPress={() =>
              this.handleSubscriberSelection(subscribers, subscribers[0])
            }
            key={subscribers[0]}>
            <OTSubscriberView
              streamId={subscribers[0]}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.secondarySubscribers}>
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={dimensions.width / 2}
            snapToAlignment={'center'}
            onScrollEndDrag={e => this.handleScrollEnd(e, subscribers.slice(1))}
            style={{
              width: dimensions.width,
              height: dimensions.height / 4,
            }}>
            {subscribers.slice(1).map(streamId => (
              <TouchableOpacity
                onPress={() =>
                  this.handleSubscriberSelection(subscribers, streamId)
                }
                style={{
                  width: dimensions.width / 2,
                  height: dimensions.height / 4,
                }}
                key={streamId}>
                <OTSubscriberView
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  key={streamId}
                  streamId={streamId}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </>
    ) : subscribers.length > 0 ? (
      <TouchableOpacity style={styles.fullView}>
        <OTSubscriberView
          streamId={subscribers[0]}
          key={subscribers[0]}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: -1,
          }}
        />
      </TouchableOpacity>
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No one connected</Text>
      </View>
    );
  };

  videoView = () => {
    return (
      <>
        <View style={styles.fullView}>
          <OTSession
            apiKey={this.apiKey}
            sessionId={this.sessionId}
            token={this.token}
            eventHandlers={this.sessionEventHandlers}
            options={{
              enableStereoOutput: true,
              androidOnTop: 'publisher',
            }}>
            <OTPublisher
              onTop
              properties={{
                cameraPosition: this.state.frontCamera ? 'front' : 'back',
              }}
              eventHandlers={this.publisherEventHandlers}
              style={[styles.publisherStyle]}
            />
            <OTSubscriber
              style={{
                height: dimensions.height,
                width: dimensions.width,
              }}
              eventHandlers={this.subscriberEventHandlers}
              streamProperties={this.state.streamProperties}>
              {this.renderSubscribers}
            </OTSubscriber>
          </OTSession>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={this.toggleAudio}>
              <Icon
                style={{fontSize: 24, color: '#fff'}}
                name={this.state.localPublishAudio ? 'mic' : 'mic-off'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={this.toggleCameraPosition}>
              <Icon
                style={{fontSize: 24, color: '#fff'}}
                name="flip-camera-ios"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconStyle, {backgroundColor: '#d9534f'}]}
              onPress={this.endCall}>
              <Icon
                style={{fontSize: 24, color: '#fff'}}
                name="call-end"
                onPress={this.endCall}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={this.toggleVideo}>
              <Icon
                style={{fontSize: 24, color: '#fff'}}
                name={
                  this.state.localPublishVideo ? 'videocam' : 'videocam-off'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  joinVideoCall = () => {
    return (
      <SafeAreaView
        style={[
          styles.fullView,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <TouchableOpacity
          style={{
            backgroundColor: '#02044a',
            width: '35%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={this.joinCall}>
          <Text style={{color: '#fff', fontSize: 18}}>Join call</Text>
        </TouchableOpacity>
        {/* <Button
          title="Join Call"
          color="#841584"
          accessibilityLabel="Join call">
          Join Call
        </Button> */}
      </SafeAreaView>
    );
  };

  render() {
    return this.state.joinCall ? this.videoView() : this.joinVideoCall();
  }
}

// todo remember to twick the styles to not copy agora

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: 'transparent', //'#131415' Vonage Black
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    // left: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    zIndex: 999,
  },
  iconStyle: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#888',
    /* borderRadius: 50 */
  },
  fullView: {
    flex: 1,
    // position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  footer: {
    // color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  publisherStyle: {
    width: 100,
    height: 150,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 999,
    borderRadius: 10,
  },
  mainSubscriberStyle: {
    height: (dimensions.height * 3) / 4 - 50,
  },
  secondarySubscribers: {
    height: dimensions.height / 4,
  },
});

export default VideoCall;
