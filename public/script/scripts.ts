interface INamespace {
  name: string;
  img: string;
  endpoint: string;
  id: number;
  rooms: IRoom[];
}

interface IRoom {
  roomId: number;
  roomTitle: string;
  namespaceId: string;
  privateRoom: boolean;
  history: any[];
}

let userName = 'Blue Star';
let password = '1234';

const clientOptions = {
  auth: {
    userName,
    password
  }
}

// @ts-ignore
const socket = io("http://localhost:8001", clientOptions);



const nameSpaceSocket: any = [];
const listeners = {
  nsChange: [] as any[],
  messageToRoom: [] as any[]
};

let selectedNsId = 0;

document.querySelector('#message-form')!.addEventListener('submit', (e) => {
  e.preventDefault();

  // Grab the text from the input
  const userMessageElement = document.querySelector('#user-message') as HTMLInputElement;
  const newMessage = userMessageElement ? userMessageElement.value : ''; 

  // Emit the message to the server
  nameSpaceSocket[selectedNsId].emit('newMessageToRoom', {
      text: newMessage,
      date: Date.now(),
      avatar: 'https://via.placeholder.com/30',
      userName,
      selectedNsId
  });

  userMessageElement.value = '';
});


// addListener jon is to manage all listeners =added to all namespaces
const addListener = (nsId) => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSocket[nsId].on("nsChange", (data) => {
      console.log(data);
    });

    listeners.nsChange.push(true);
  }

  if (!listeners.messageToRoom[nsId]) {
    nameSpaceSocket[nsId].on("messageToRoom", (data) => {

      const messageHtml = buildMessageHtml(data);
      const messagesUl = document.querySelector('#messages') as HTMLUListElement;
      messagesUl.insertAdjacentHTML('beforeend', messageHtml);
      
    });

    listeners.messageToRoom[nsId] = true;
  }
};


socket.on("connect", () => {
  console.log("Connected to the server from the client");
  socket.emit("clientConnect");
});

// listen for the nsList, which is a list of all the namespaces
socket.on("nsList", (nsData: INamespace[]) => {
  const lastNs = localStorage.getItem("lastNs") || "";

  const nameSpaceDiv = document.querySelector(".namespaces") as HTMLDivElement;
  nameSpaceDiv.innerHTML = "";

  nsData.forEach((ns) => {
    nameSpaceDiv?.insertAdjacentHTML(
      "beforeend",
      `<div class="namespace" ns=${ns.endpoint}><img src=${ns.img} /></div>`
    );

    // ?initialize thisNs as its index in the nameSpaceSocket array

    if (!nameSpaceSocket[ns.id]) {
      nameSpaceSocket[ns.id] = io(`http://localhost:8001${ns.endpoint}`);
    } 
    addListener(ns.id);
  });

  const namespaceElements = document.getElementsByClassName("namespace");

  Array.from(namespaceElements).forEach((elem: Element) => {
    elem.addEventListener("click", (e) => {
      joinNs(elem, nsData);
    });
  });

  //if lastNs is not empty, join the last namespace
  if (lastNs) {
    const ns = nsData.find((ns) => ns.endpoint === lastNs);
    if (ns) {
      const lastNsElement = document.querySelector(
        `.namespace[ns="${lastNs}"]`
      );
      if (lastNsElement) {
        joinNs(lastNsElement, nsData);
      }
    }
  } else {
    if (namespaceElements.length > 0) {
      joinNs(namespaceElements[0], nsData);
    }
  }
});

