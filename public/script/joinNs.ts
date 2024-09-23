const joinNs = (elem: Element, nsData) => {
  if (!(elem instanceof Element)) {
    return;
  }

  const nsEndpoint = elem.getAttribute("ns");
  const clickedNs = nsData.find((ns) => ns.endpoint === nsEndpoint);

  const rooms = clickedNs?.rooms;

  let roomList = document.querySelector(".room-list") as HTMLUListElement;
  roomList.innerHTML = "";

  // iterate over the rooms and add a room to the roomList
  rooms?.forEach((room) => {
    return roomList?.insertAdjacentHTML(
      "beforeend",
      `<li class="room"><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`
    );
  });

  if (nsEndpoint) {
    localStorage.setItem("lastNs", nsEndpoint);
  } else {
    console.error("Namespace endpoint is null");
  }
};

