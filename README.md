##### :heavy_exclamation_mark: Status :heavy_exclamation_mark:
Should work on all regions as long as the opcodes are mapped but I personally only test modules on NA with Caali's tera-proxy: https://discord.gg/maqBmJV  

##### :heavy_exclamation_mark: Installation for Caali's tera-proxy :heavy_exclamation_mark:
1) Download EnrageNotifier: https://github.com/TeraProxy/EnrageNotifier/archive/master.zip
2) Extract the contents of the zip file into "\tera-proxy\bin\node_modules\"
3) Done! (the module will auto-update when a new version is released)
  
If you enjoy my work and wish to support future development, feel free to drop me a small donation: [![Donate](https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=A3KBZUCSEQ5RJ&lc=US&item_name=TeraProxy&curency_code=USD&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
  
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
<details>

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