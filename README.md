# Minesweeper
A vanilla Javascript remake of the classic game Minesweeper, with the iconic design made by Microsoft in 1990.

## Gameplay
The game is modeled to function in the exact same way as the original. The user is presented with three difficulties, representing different board sizes with different numbers of mines.
<br>
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/9e916c80-83da-4d21-b311-7f431e05e9e5" width="300">
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/5b5bfc60-dadd-4324-8f05-abfe81a54f65" width="200">
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/2d839ef8-99ab-4191-bc5d-a699d53ae81e" width="250">
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/7bab196f-0bed-4d69-94d3-7c63dd151f8f" width="600">

The objective is to clear out the entire board and locate the hidden mines. This is done by left-clicking tiles that the player thinks doesn't have mines, and either avoiding or right-clicking (marks out the tile with a flag) tiles that the player suspects has mines. When a tile not containing a mine is clicked it reveals how many mines are located in the eight adjacent tiles. If there are no mines adjacent to the clicked tile, the game automatically "clicks" all of the adjacent tiles until tiles that do have mines adjacent to them are located. The game is lost by clicking a tile containing a mine, and won by clearing all tiles not containing mines.
<br>
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/877fe8a1-34a1-4c77-a538-fb20952fdaaa" width="600">

## Features
### Mine counter
On the top left is a counter representing how many mines a given board has. By right-clicking and marking tiles with flags the counter goes down. This way the player can keep track of how many mines are left to discover (assuming the player has marked the correct tiles).
<br>
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/d2f450ec-e66b-4bf3-86ef-774298259a2e" width="180">
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/f9b68057-a827-4959-8ced-27f765b98c5c" width="200">

### Game state
In the middle of the top bar is a smileyface representing the current game state. The face reacts to the player clicking tiles, and will show if the game is either lost or won.
<br>
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/e6a8a5c0-0942-4364-b46f-9a047a3fdeb7" width="100">
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/71dc1caa-52dd-4149-8971-bb1071a9f9ec" width="100">
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/924b5e02-252e-40f2-b974-52704e6179d1" width="100">
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/beaac620-19a1-447e-85f2-9194bdfaa083" width="100">

### Timer
On the top right is a timer that starts when the player clicks their first tile. This way, the game isn't only about clearing out all the tiles, but also about doing so in an as short amount of time as possible.
<br>
<img src="https://github.com/axel-nyman/Minesweeper/assets/96598978/92db6b6e-750e-4319-8e69-b1b18128605a" width="200">
