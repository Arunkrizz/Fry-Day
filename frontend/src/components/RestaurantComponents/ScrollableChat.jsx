import ScrollableFeed from 'react-scrollable-feed'
import { useSelector } from 'react-redux';
import { isSameSenderMargin, isSameUser } from '../config/chatLogics';
import { format } from 'date-fns';

import PropTypes from 'prop-types';
const ScrollableChat = ({ messages }) => {
    const { hotelInfo } = useSelector((state) => state.hotelAuth);
// console.log(messages,"scrollblechtres");
  return (
    <ScrollableFeed>
        {messages &&
              messages.map((m, i) => (
                <div style={{display: "flex"}} key={m._id}>
                    <span
                        style={{
                            backgroundColor: `${
                                m?.sender?._id === hotelInfo.hotelInfo._id ? "#B9F5D0" : "#BEE3F8"
                            }`,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            marginLeft: isSameSenderMargin(messages, m, i, hotelInfo?.hotelInfo?._id),
                            marginTop: isSameUser(messages, m, i) ? 3 : 10
                        }}
                    >
                        {m.content}
                        <br />
              <small style={{ color: "gray" }}>
                {format(new Date(m.createdAt), "h:mm a")}
              </small>
                    </span>
                    {/* {console.log("marginLeft", isSameSenderMargin(messages, userInfo.id))} */}
            {/* {console.log("marginTop", isSameUser(messages, m, i) ? 3 : 10)} */}
                </div>
              ))
        }
    </ScrollableFeed>
  )
}

export default ScrollableChat