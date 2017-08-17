# EnrageNotifier
A tera-proxy module that sends you a notice about a boss being enraged and the percentage of its next enrage.  
  
## Usage  
While in game, open a proxy chat session by typing "/proxy" or "/8" in chat and hitting the space bar.  
This serves as the script's command interface.  
The following commands are supported:  
  
* enrage - enable/disable EnrageNotifier  
* enrage alert - enable/disable alerts in the center of your screen  
  
Any other input, starting with "enrage", will return a summary of above commands in the chat.  
  
## Safety
Whatever you send to the proxy chat in game is intercepted client-side. The chat is NOT sent to the server.  
  
## Changelog
### 1.1.0
* [+] Added "alert" option and command
* [*] Full conversion to Pinkie Pie's command module which is now a requirement
### 1.0.0
* [*] Initial Release
