const buildMessageHtml = (messageObj) => {
  const convertedDate = new Date(messageObj.date).toLocaleString();
  const newHtml = `
    <li>
        <div class="user-image">
            <img src="${messageObj.avatar}" />
        </div>
        <div class="user-message">
            <div class="user-name-time">${messageObj.userName} <span>${convertedDate.toLocaleString()}</span></div>
            <div class="message-text">${messageObj.text}</div>
        </div>
    </li>
  `;
  return newHtml;
}
  