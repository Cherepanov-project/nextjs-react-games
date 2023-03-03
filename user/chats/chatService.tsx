import { io } from 'socket.io-client';

let token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxQHEucSIsImlhdCI6MTY3NzgxNTYzNCwiZXhwIjoxNjc3OTAyMDM0fQ.omxxJlRa_K1blICsG1rePG9a8JQFmShPb44gUGbAfp5hJ303BQPuYTKyv34o7J28R6f2tLLmTpCrUTFQem7mEg';

export default class ChatService {
  socket = io('ws://91.241.64.78:8088/ws', {
    extraHeaders: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
  start = () => {
    console.log('Connecting to websocket');

    this.socket.on('connect', () => {
      console.log('Connected', this.socket.id);
    });

    this.socket.on('message', (data) => {
      console.log(data);
    });

    // socket.on('disconnect', () => {
    //   console.log('Disconnected', socket.id); // undefined
    // });
  };
  emit = (message: any) => {
    console.log('EMIT');
    this.socket.emit('send', { message });
  };
}
