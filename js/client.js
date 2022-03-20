const socket=io('http://localhost:8000');
const form =document.getElementById('send-container');
const messageinput=document.getElementById('messageinp')
const messagecontainer=document.querySelector(".container")
// var audio=new audio('ting.mp3');
const append = ( message , position)=>{
const messageelement =document.createElement('div');
messageelement.innerText=message;
messageelement.classList.add('message');
messageelement.classList.add(position);
messagecontainer.append(messageelement);
// if(position=='left'){
// audio.play();} 
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    if(message!=''){
    append(`Me: ${message}`,'right');
    socket.emit('send',message);
    messageinput.value='';}
})
const names = prompt("enter you name to join");

socket.emit('new-user-joined', names);

socket.on('user-joined', names =>{
append(`${names}! joined the chat` , 'right')

})
socket.on('receive', data =>{
    append(`${data.name} : ${data.message}` , 'left')
    })
    socket.on('left', name =>{
        append(`${name} left the chat` , 'right')
        })   

 