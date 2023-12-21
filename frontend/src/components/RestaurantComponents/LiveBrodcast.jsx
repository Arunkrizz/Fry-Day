import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';
import { useSelector } from 'react-redux';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function LiveStreaming() {



    function sendRoomId(roomId){
        if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {

            try {
                       axios.post('/api/hotel/updateLiveBrodcastRoomId', {
                        roomId: roomId,
                        hotelInfo:hotelInfo.hotelInfo._id
                        // other data you want to send
                      });
                      console.log('Data sent successfully');
                    } catch (error) {
                      console.error('Error sending data to the backend', error);
                    }
        
        
        
          }
    }

    const { hotelInfo } = useSelector((state) => state.hotelAuth);
    
  const roomID = getUrlParams().get('roomID') || randomID(5);
  let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {

    // try {
    //            axios.post('/api/hotel/updateLiveBrodcastRoomId', {
    //             roomID: roomID,
    //             hotelInfo:hotelInfo.hotelInfo._id
    //             // other data you want to send
    //           });
    //           console.log('Data sent successfully');
    //         } catch (error) {
    //           console.error('Error sending data to the backend', error);
    //         }

    sharedLinks.push({
      name: 'Join as co-host',
      url:
        window.location.protocol + '//' + 
        window.location.host + window.location.pathname +
        '?roomID=' +
        roomID +
        '&role=Cohost',
    });

  }
  sharedLinks.push({
    name: 'Join as audience',
    url:
     window.location.protocol + '//' + 
     window.location.host +
    //   window.location.pathname +
      "/user/live"+
      '?roomID=' +
      roomID +
      '&role=Audience',
  });
 // generate Kit Token
  const appID = 1688375948;
  const serverSecret = "8affd1036a4ba2257102ff25ecd49555";  // secret
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


  // start the call
  let myMeeting = async (element) => {
      // Create instance object from Kit Token.
      sendRoomId(roomID)

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks,
      });
  };

 

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}