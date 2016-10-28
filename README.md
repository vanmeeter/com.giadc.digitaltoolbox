## GIADC digitalToolbox

#### Installation

1. Navigate to Library/Application Support/adobe/CEP/extensions
2. Place the com.giadc.digitalToolbox folder into the extensions Folder
3. Drag and drop the extensions folder into the favorites side panel on your finder
4. In terminal type:

  ```
  defaults write com.adobe.CSXS.6 PlayerDebugMode 1
  ```

  ```
  killall -u <username> cfprefsd
  ```
5. Run plugin from Window > Extensions > digitalToolbox
6. Restart computer if plugin does not load.

#### Initializing Ad
1. The only thing required at this point is a url for the clickTag.
2. The orange box will appear on the left indicating it is required to enter a clickTag.

  ![clickTag Area](https://raw.githubusercontent.com/vanmeeter/com.giadc.digitaltoolbox/super_cleanup_time/images/Screen%20Shot%202016-10-28%20at%2011.29.04%20AM.png)

3. After a url is entered, the initialize button can be pressed. The border will default at 1px black, the loop at loop, and the static image at the end of the timeline.

  ![clickTag Area](https://raw.githubusercontent.com/vanmeeter/com.giadc.digitaltoolbox/super_cleanup_time/images/Screen%20Shot%202016-10-28%20at%2011.45.03%20AM.png)

#### Top Row Settings

On the top row you will find the Border, Static, and Loop settings.
##### Border
1. To set the border click the button. A menu will appear with the border settings:

  ![clickTag Area](https://raw.githubusercontent.com/vanmeeter/com.giadc.digitaltoolbox/super_cleanup_time/images/Screen%20Shot%202016-10-28%20at%2011.48.52%20AM.png)

2. Change the settings as needed.
3. Once you have the values set, click the border button again. The menu will disappear and the border will be created. A preview of the border will also be applied to the border of the button. The settings menu will not disappear until the border button is hit again.

This button needs to be used to at least edit the border's width in order to have a border that displays properly. If you don't want to use the button to edit the color, you can edit the color by directly selecting it.

##### Static
You can set the static jpg and the end frame by moving your timeline to the desired location and clicking set static. You can also drag the keyframe with the static flag in the timeline if you do not wish to use the button.

##### Loop
The toggle switch can be used to choose a 3x loop or a replay button.
If set to replay, a replay button will be added to the last frame, and default to the upper right corner. It can be moved and the color changed manually if needed.

#### ClickTags
1. To change url, just click on the area containing the url.
2. You can add up to 9 clickTags by pressing the + button in the clickTag area header.
3. To remove a clickTag, click on the specific clickTag you want to remove. The panel will slide over allowing you to remove that specific clickTag by pressing the - button:

  ![clickTag Area](https://raw.githubusercontent.com/vanmeeter/com.giadc.digitaltoolbox/super_cleanup_time/images/Screen%20Shot%202016-10-28%20at%2012.04.17%20PM.png)

  **One note about this, when you click the clickTag area to slide it over be sure to click above the url field. If this is annoying I'll fix that, just let me know. Also when you remove a clickTag the numbers will adjust automatically, but you will need to hit generate clickTag again**
4. After you have the tags and urls wanted, click Generate ClickTag. They will default being over the entire ad, and be spread even over the timeline. This can be edited manually if a hotspot clickTag is needed. If the size and position is edited, be sure to edit the outside button symbol, not the inside content of the button.

Only this tool should be used to add/remove clickTags rather than removing them manually.

#### Disclaimer Tool
The disclaimer tool will be able to add up to 3 disclaimers(feature coming soon).
1. You can add a disclaimer by clicking the + button in the disclaimer area header:

  ![clickTag Area](https://raw.githubusercontent.com/vanmeeter/com.giadc.digitaltoolbox/super_cleanup_time/images/Screen%20Shot%202016-10-28%20at%2012.12.51%20PM.png)

2. To edit the settings for the disclaimers, click the S button in the in the disclaimer area header. A menu will slide down where you can edit corners(round or sharp), activate the disclaimer by click or by hover, click through or not(click version of disclaimer defaults this to off), color of font, opacity of bg(slider), and the color of the background:

  ![clickTag Area](https://raw.githubusercontent.com/vanmeeter/com.giadc.digitaltoolbox/super_cleanup_time/images/Screen%20Shot%202016-10-28%20at%2012.19.23%20PM.png)

  **One note, some of the settings are not well labeled, I'll fix that down the road.**

3. To edit the text of the disclaimer, click the box of the disclaimer you wish to edit. The font will be open sans(web font):

  ![clickTag Area](https://raw.githubusercontent.com/vanmeeter/com.giadc.digitaltoolbox/super_cleanup_time/images/Screen%20Shot%202016-10-28%20at%2012.24.26%20PM.png)


4. To remove disclaimer just click the - button(coming soon).
5. After everything, is set just click the Generate Disclaimer button and it will be add.

**Note: currently we do not have web fonts(we need the latest update), so it will default to times New Roman(ugly) for now. This may cause the disclaimer to size itself strangely, if this happens, you can go in an edit the content in the symbols. Everything should be ok as long as you don't mess with the code. You can even alter the animation, just not the code.**

#### Footer
The footer tool includes the publish button, the publish jpg button, the size of the static jpg, the size report, and lastly the refresh button.

  ![clickTag Area](https://raw.githubusercontent.com/vanmeeter/com.giadc.digitaltoolbox/super_cleanup_time/images/Screen%20Shot%202016-10-28%20at%2012.30.41%20PM.png)

##### Publish
This will publish the html document and the sprite sheet.

##### Publish JPG
This publishes the static jpg based on where you have the static flag on the timeline set. It will also put the jpg in the correct folder and automatically name it based on the SUB or COR file. If neither file is present, it will name it based on the name of the fla file.

##### Publish JPG Size Field
This sets the max size the static jpg will be. It will default to 40kb, but can set to what ever you need.

##### Size Report
This will be generated when you publish the html file. It includes the size of the html + size of the sprite sheet.

##### Refresh Button
This will automatically retrieve the info in an already created ad and auto populate the fields. It's a way to force it if, for some reason, it doesn't auto populate on it's own. It is also used to clear all info on a new ad. If you have a blank fla file open, and this is pressed, it will put everything back to default.
