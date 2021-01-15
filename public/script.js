const Socket  = io("/");

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
}); 

let myVideoStream

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
//we answer it and added to the video stream
    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    Socket.on('user-connected', (userId) => {
    connectToNewUser(userId, stream);
})
})

peer.on('open', id => {
    Socket.emit('join room', ROOM_ID, id);
})

//we are calling the user
const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

//chat section
let text = $('input')


$('html').keydown((e) => {
    if (e.which == 13 && text.val().length !== 0){
        console.log(text.val())
        socket.emit('message', text.val());
        text.val('')
    }   
})

socket.on('createMessage', message => {
    console.log('its from server', message)
})