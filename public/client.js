$(document).ready(function () {
        function appendMessage (message) {
                $('#messages').append(
                        $('<li>').html(`<b> ${message} <b>`)
                )
        }
        /*global io*/
        const socket = io() // Loaded via CDN script in chat.pug
        socket.on('user', function (data) {
                $('#num-users').text(`${data.currentUsers} users online`)
                const message = `${data.username} has ${data.connected ? 'joined' : 'left'} the chat.`
                appendMessage(message)
        })

        socket.on('chat message', (data) => {
                const message = `${data.username} : ${data.message}`
                appendMessage(message)
        })

        // Form submittion with new message in field with id 'm'
        $('form').submit(function () {
                var messageToSend = $('#m').val();

                socket.emit('chat message', messageToSend)

                $('#m').val('');
                return false; // prevent form submit from refreshing page
        });
});
