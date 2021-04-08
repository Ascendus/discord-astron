<div align="center">
  <br />
  <p>
    <a href="https://google.com"><img src="https://media.discordapp.net/attachments/773034661923913728/824139172948213760/unknown.png" alt="discord-astron" style="border-radius: 5px"/></a>
  <p>
  <br />
</div>

## About
discord-astron is a simplified discord.js framework based on discord-akairo and discord.js by Astron Studios, for beginners. 

## Installation 
`npm install discord-astron`

## Example Usage
```javascript
const Astron = require("discord-astron");
const client = new Astron.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.channel.send('pong');
  }
});

client.login('token');
```

## Links
TBC

## Help
You can get support at the official Astron Studios Discord support server. For discord.js-related issues you can get support in the official discord.js server.

* [**discord-astron Support Server**](https://discord.gg/vsfXUwsXph/)
* [**discord.js Support Server**](https://discord.gg/bRCvFy9)
