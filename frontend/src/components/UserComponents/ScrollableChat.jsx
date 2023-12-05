import ScrollableFeed from 'react-scrollable-feed'
import { useSelector } from 'react-redux';
import { isSameSenderMargin, isSameUser } from '../config/chatLogics';
import PropTypes from 'prop-types';
const ScrollableChat = ({ messages }) => {
    const { userInfo } = useSelector((state) => state.auth);

  return (
    <ScrollableFeed>
        {messages &&
              messages.map((m, i) => (
                <div style={{display: "flex"}} key={m._id}>
                    <span
                        style={{
                            backgroundColor: `${
                                m.sender._id === userInfo.id ? "#B9F5D0" : "#BEE3F8"
                            }`,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            marginLeft: isSameSenderMargin(messages, m, i, userInfo.id),
                            marginTop: isSameUser(messages, m, i) ? 3 : 10
                        }}
                    >
                        {m.content}
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