import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

import { HubService } from './hub.service';

@Injectable()
export class MsgService {

  isLoading: EventEmitter<boolean> = new EventEmitter(true);

  private MESSAGE_URL = environment.api_url + 'api/messages';

  private messageStore: any = [];
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();

  message = {
    user: '',
    text: ''
  };

  constructor(private http: Http, private sb: MatSnackBar, public hub: HubService) {
    this.hub.newMessage.subscribe((message) => {
      this.messageStore.push(JSON.parse(message));
      this.messageSubject.next(this.messageStore);
    });
  }

  private handleError(error) {
    this.isLoading.emit(false);
    this.sb.open(error, 'close');
  }

  get tokenHeader() {
    let header = new Headers;
    header = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return new RequestOptions({ headers: header });
  }

  getMessages() {
    this.hub.setConnection();
    this.isLoading.emit(true);
    this.http.get(this.MESSAGE_URL, this.tokenHeader).subscribe(response => {
      this.isLoading.emit(false);
      this.messageStore = response.json();
      this.messageSubject.next(this.messageStore);
    }, error => {
      this.handleError('Unable to get messages');
    });
  }

  postMessage() {
    this.isLoading.emit(true);
    this.http.post(this.MESSAGE_URL, this.message, this.tokenHeader).subscribe(response => {
      this.isLoading.emit(false);
      this.hub.invokeMessage(JSON.stringify(response.json()));
      this.message.text = '';
    }, error => {
      this.handleError('Unable to post message');
    });
  }

}
