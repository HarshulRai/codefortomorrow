document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    socket.on('welcome',(data) => {
        console.log('Welcome', data);
    });

    socket.on('chat message', (data) => {
        const { content, userId } = data;
        const messageDiv = document.getElementById('messages');
        const messageP = document.createElement('p');
        messageP.textContent = '${userId}" ${content}';
        messageDiv.appendChild(messageP)
    });

    socket.on('user joined', (data) => {
        console.log('user joined', data);
    })

    socket.on('user left', (data) => {
        console.log('User left', data);
    });

    const form = document.querySelector('form');
    form.addEventListener('submit',(e) => {
        e.preventDefault();
        const input = document.getElementById('m');
        const content = input.value.trim();
        const broadcastCheckbox = document.getElementById('broadcastCheckbox');
        const broadcast = broadcastCheckbox.checked;

        if(content){
            const recipientUserId = document.getElementById('recipientUserId').value.trim();
            socket.emit('chat message', { content, broadcast, recipientUserId });
            input.value = '';
        }
    });

    const username = prompt('Enter your Username')
    socket.emit('login', { username })

})