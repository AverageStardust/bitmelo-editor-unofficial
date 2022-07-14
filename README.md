# bitmelo-editor-unofficial README

Make Bitmelo games in VS code. Use the art, sound and tilemap editors from Bitmelo. Work on your code in a real IDE and live share.

[Bitmelo Editor Official README](./reactApp/README.md)

[Bitmelo Editor Licence](./reactApp/agpl.txt) (dual licensed, look at README)

---

## Screenshots

<div style="display: flex; flex-direction: row; flex-wrap: wrap;" >
	<img src="./images/editor.png" style="flex: 1" alt="drawing" width="480"/>
	<img src="./images/game.png" style="flex: 1" alt="drawing" width="480"/>
</div>

---

## What commands are added?
	>Initialize Bitmelo
	Create a new empty Bitmelo project in the editor, saves to local files

	>Open Bitmelo
	Reopen a local Bitmelo project in the editor

	>Lock Bitmelo
	Lock your editor to prevent changes and allow others to edit on Live Share

	>Unlock Bitmelo
	Unlock your editor to allow changes

---

## How are your projects saved?
	.
	├──bitmeloExport.json      <-- All your project data, synced live
	└──code                    <-- Human readable code, synced with project when saved
		└──0_MyScript.js       <-- First script, named "MyScript"
		└──1_MyOtherScript.js  <-- Second script, named "MyOtherScript"

---

## Limitations
	Bitmelo code tab is removed: You are in VS code for a reason

	Bitmelo publish tab is removed: I don't want to deal with accounts, you can still export when you are done

	Live share on art/sound/tilemaps: Only the person can edit art/sound/tilemaps at a time, everyone else must lock or close their editor

	This may be a buggy mess I wrote in 3 days: Backup your "bitmeloExport.json" file often!

---

## Release Notes

## 1.3.0
- Added systems to allow only one unlocked editor at a time
- Fixed bubs

## 1.2.0

- Added editor locking
- Fixed bugs

## 1.1.0

- Added auto code sync
- Fixed bugs

### 1.0.0

- Initial release of bitmelo-editor-unofficial