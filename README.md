##### :heavy_exclamation_mark: Status :heavy_exclamation_mark:
Should work on all regions as long as the opcodes are mapped. Works on Caali's and Pinkie Pie's tera-proxy.

##### :heavy_exclamation_mark: Installation :heavy_exclamation_mark:
1) Download EnrageNotifier: https://github.com/TeraProxy/EnrageNotifier/archive/master.zip
2) Extract the contents of the zip file into "\tera-proxy\mods\"
3) Done! (the module will auto-update on Caali's proxy when a new version is released)
  
Users of Pinkie's proxy also need to install tera-game-state: https://github.com/caali-hackerman/tera-game-state/archive/master.zip  
  
If you enjoy my work and wish to support future development, feel free to drop me a small donation: [![Donate](https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=A3KBZUCSEQ5RJ)

![Screenshot](https://i.imgur.com/E07ZD18.png)

# EnrageNotifier
A tera-proxy module that sends you a notice about a boss being enraged and the percentage of its next enrage.  

## Usage
While in game, open a proxy chat session by typing "/proxy" or "/8" in chat and hitting the space bar.  
This serves as the script's command interface.  
The following commands are supported:  
  
* enrage - enable/disable EnrageNotifier  
* enrage alert - enable/disable alerts in the center of your screen  
* enrage log - enable/disable logging of notices to proxy chat  
  
Any other input, starting with "enrage", will return a summary of above commands in the chat.

## Safety
Whatever you send to the proxy chat in game is intercepted client-side. The chat is NOT sent to the server.

## Changelog
<details>

### 1.2.1
* [*] Fixed wrong hook being used
* [+] Added "LOG" option and "log" command
* [-] Removed "SHOW_ENRAGE_TIME" option and "time" command
### 1.2.0
* [*] Updated hooks for patch 79
* [+] Added "SHOW_ENRAGE_TIME" option and "time" command
### 1.1.9
* [~] Using default chat size now. Looks just better in new UI.
### 1.1.8
* [*] Updated to work with BigInt
### 1.1.7
* [~] Look and feel will now be the same on Caali's and Pinkie's proxy
### 1.1.6
* [~] Cross compatibility for Caali's and Pinkie's proxy (no more branch)
### 1.1.5
* [~] Definition update
* [+] Added a branch for Pinkie Pie's tera-proxy
### 1.1.4
* [~] Code changes due to Caali's recent tera-proxy updates
* [-] Removed support for Pinkie Pie's tera-proxy
### 1.1.3
* [*] Fixed issues with 64-bit HP and conversions (thx Pinkie!)
* [*] Slight performance optimization
### 1.1.2
* [+] Rewrote code to use Caali's "tera-game-state" module in order to reduce overhead
* [+] Now supports auto-updating via Caali's tera-proxy
### 1.1.1
* [*] Updated hook versions for compatibility with the latest Tera-Proxy programs
### 1.1.0
* [+] Added "alert" option and command
* [*] Full conversion to Pinkie Pie's command module which is now a requirement
### 1.0.0
* [~] Initial Release

</details>