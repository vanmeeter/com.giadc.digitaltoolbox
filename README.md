## GIADC digitalToolbox

#### Installation

1. Navigate to Library/Application Support/adobe/CEP/extensions
2. Place the com.giadc.digitalToolbox folder into the extensions Folder
3. Drag and drop the extensions folder into the favorites side panel on your finder
4. In terminal type:
  ```
  defaults write com.adobe.CSXS.6 PlayerDebugMode 1
  killall -u <username> cfprefsd
  ```
5. Run plugin from Window > Extensions > digitalToolbox
6. Restart computer if plugin does not load.
