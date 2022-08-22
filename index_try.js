const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');


// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    authStrategy: new LocalAuth()
});
 

client.on('qr', (qr) => {
    //console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats=> {
        //const myGroup = chats.find((chat) => chat.name === '<test');
        console.log(chats[0]);
        client.sendMessage(chats[0].id._serialized,"היי, זו הודעה אוטומטית")
    });


    // Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
    else if(message.body === 'עבד') {
        message.reply('נמאס מ29.12');
    }
    else if(message.body === 'רואי'){
        message.reply('כן למתכנת התותח פה שהזכרת למעלה בהחלט קוראים רואי');
    }


});
 
 
 
     

    
});

client.initialize();