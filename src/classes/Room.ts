export class Room {
  history: any[];
  constructor(
    public roomId: number,
    public roomTitle: string,
    public namespaceId: string,
    public privateRoom=false
  ){
    this.history = [];
  }
  //test 

  addMessage(message: any){
    if (this.history.length > 10){
      this.history.shift();
    }
    this.history.push(message);
  }

} 