import { NameSpace } from "../classes/NameSpace";
import { Room } from "../classes/Room";

const wikiNs = new NameSpace(
  0,
  "Wikipedia",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png",
  "/wiki"
);

const mozNs = new NameSpace(
  1,
  "Mozilla",
  "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png",
  "/mozilla"
);

const linuxNs = new NameSpace(
  2,
  "Linux",
  "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png",
  "/linux"
);

wikiNs.addRoom(new Room(0, "New Articles", "0", true));
wikiNs.addRoom(new Room(1, "Editors", "0"));
wikiNs.addRoom(new Room(2, "Other", "0"));

mozNs.addRoom(new Room(0, "Firefox", "1"));
mozNs.addRoom(new Room(1, "SeaMonkey", "1"));
mozNs.addRoom(new Room(2, "SpiderMonkey", "1"));

linuxNs.addRoom(new Room(0, "Debian", "2"));
linuxNs.addRoom(new Room(1, "Red Hat", "2"));
linuxNs.addRoom(new Room(2, "MacOS", "2"));

export const namespaces= [wikiNs, mozNs, linuxNs];

