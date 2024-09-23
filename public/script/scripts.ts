// import { io } from "https://cdn.socket.io/4.0.0/socket.io.esm.min.js";
// const userName: string | null = window.prompt("Enter your name");
// const password: string | null = window.prompt("Enter your password");

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

//@ts-expect-error
const socket = io("http://localhost:8001");

socket.on("connect", () => {
  console.log("Connected to the server from the client");
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
      const lastNsElement = document.querySelector(`.namespace[ns="${lastNs}"]`);
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

