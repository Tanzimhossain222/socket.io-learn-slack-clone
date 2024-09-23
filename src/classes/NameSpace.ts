export class NameSpace {
  rooms: any[];

  constructor(
    public id: number,
    public name: string,
    public img: string,
    public endpoint: string
  ) {
    this.rooms = [];
  }

  addRoom(room: any) {
    this.rooms.push(room);
  }
}