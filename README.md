##### :heavy_exclamation_mark: Status :heavy_exclamation_mark:
Working on NA Counterpunch patch with the latest https://github.com/meishuu/tera-data.  
Please always keep your tera-data up-to-date.  
Other regions will work if the opcodes are mapped but I personally only test modules on NA.  

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
### 1.1.0
* [+] Added "alert" option and command
* [*] Full conversion to Pinkie Pie's command module which is now a requirement
### 1.0.0
* [*] Initial Release
