# jeffbot-v3

A Discord bot named Jeff
Currently working on basic functionality

End Goal: For any given message in any chat channel, the bot should be able to delete the message and replace it with an identical one, except every word is replaced with 'Jeff', whilst keeping the puncuation the same.


_Development Files_:  

	``` app.js: Contains the code executed by the bot after being activated ```
	
	``` config.js: Contains confidential information about the bot```


_Config.js Setup_: 
	
As the ``` config.js ``` file contains confidential information, you need to construct the file yourself if you want to use this code. Set up the file as such:

```
{
	"token": "YOUR-TOKEN-HERE", //Token retrieved from your discord developer portal
   	"prefix": ">" //Prefix for bot commands- can be set to anything
}
```

_Additional Notes_:

The message must be deleted and reposted, rather than edited as Discord's Terms of Service do not allow editing of other users' messages for obvious reasons
