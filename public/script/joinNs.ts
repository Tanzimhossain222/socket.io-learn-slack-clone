const joinNs = (elem: Element, nsData) => {
  if (!(elem instanceof Element)) {
    return;
  }

  const nsEndpoint = elem.getAttribute("ns");
  const clickedNs = nsData.find((ns) => ns.endpoint === nsEndpoint);

  //global nsId
  selectedNsId = clickedNs.id;

  const rooms = clickedNs?.rooms;

  let roomList = document.querySelector(".room-list") as HTMLUListElement;
  roomList.innerHTML = "";
  let firstRoom ;

  // iterate over the rooms and add a room to the roomList
  rooms?.forEach((room,i) => {

    if(i === 0){
      firstRoom = room.roomTitle;
    }


    return roomList?.insertAdjacentHTML(
      "beforeend",
      `<li id="room" data-namespaceId=${room.namespaceId} class="room"><span class="fa-solid fa-${room.privateRoom ?'lock':'globe' }"></span>${room.roomTitle}</li>`
    );
  });

  //join the first room
  joinRoom(firstRoom, clickedNs?.id);


  //add click listener to each room so client can tell server to change rooms
  const roomElements = document.querySelectorAll("#room");
  
  roomElements.forEach((elem: Element) => {
    elem.addEventListener("click", (e) => {
      console.log("Someone clicked on a room element", e.target);
      const namespaceId = elem.getAttribute("data-namespaceId");
      joinRoom((e.target as HTMLElement).innerText, namespaceId);
    });
  });




  if (nsEndpoint) {
    localStorage.setItem("lastNs", nsEndpoint);
  } else {
    console.error("Namespace endpoint is null");
  }
};

