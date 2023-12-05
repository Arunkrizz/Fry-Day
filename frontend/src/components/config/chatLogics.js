export const getSender = (userId, users,restaurants) => {
  // console.log(userId,users,restaurants,"get sender chat logics");
    // return users[0]._id === userId ? users[1].name : users[0].name
    return users[0]._id === userId ? restaurants[0].restaurantName : users[0].name
    // return "nammi"

}

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(messages,"snder==user", m,"jjjjjjj");
  // console.log("msg",messages,"m", m,"i", i,"userid", userId,"scrollable msg snd cht logic");
  if (
    (i < messages.length - 1 && messages[i + 1].sender._id === m.sender._id && messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId) ||
    (i < messages.length - 1 && messages[i + 1].sender._id !== m.sender && messages[i].sender._id !== userId)
  // true
  ) {
    return 0;
  }  else {
    return "auto";
  }
};


export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id=== m.sender._id
    // return true
}

// export const isSameSender = (messages, m, i, userId) => {
//   return (
//     i < messages.length - 1 &&
//     (messages[i + 1].sender._id !== m.sender._id ||
//       messages[i + 1].sender._id === undefined) &&
//     messages[i].sender._id !== userId
//   );
// };

// export const isLastMessage = (messages, i, userId) => {
//   return (
//     i === messages.length - 1 &&
//     messages[messages.length - 1].sender._id !== userId &&
//     messages[messages.length - 1].sender._id
//   );
// };