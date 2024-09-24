

const joinRoom = async (roomTitle: string, namespaceId) => {
  const ackResp =await nameSpaceSocket[namespaceId].emitWithAck(
    "joinRoom",
    {roomTitle, namespaceId}
  );

  ackResp.history.forEach((msg) => (
    document.querySelector("#messages")!.insertAdjacentHTML("beforeend", buildMessageHtml(msg))
  ))
  

  const numUsersElement = document.querySelector(".curr-room-num-users");
  if (numUsersElement) {
    numUsersElement.innerHTML = `Users ${ackResp.numUser} <span class="fa-solid fa-user"></span>`;
  }

  const currRoomTextElement = document.querySelector(".curr-room-text");
  if (currRoomTextElement) {
    currRoomTextElement.innerHTML = `${roomTitle}`;
  }
};
