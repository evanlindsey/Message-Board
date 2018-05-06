import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { environment } from '../../environments/environment';

@Injectable()
export class HubService {

  newMessage: EventEmitter<string> = new EventEmitter(true);

  private HUB_URL = environment.api_url + 'messagehub';

  private hubConnection;

  setConnection() {
    if (this.hubConnection == null) {
      this.hubConnection = new HubConnection(this.HUB_URL);
      this.hubConnection.on('broadcastMessage', (message) => this.broadcastMessage(message));
    }
    if (this.hubConnection.connection.connectionState !== 1) {
      this.hubConnection.start();
    }
  }

  broadcastMessage(message) {
    this.newMessage.emit(message);
  }

  invokeMessage(message) {
    this.hubConnection.invoke('send', message);
  }

}
