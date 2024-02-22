# Minesweeper
A vanilla Javascript remake of the classic game Minesweeper, with the iconic design made by Microsoft in 1990.

## Gameplay
The game is modeled to function in the exact same way as the original. The user is presented with three difficulties, representing different board sizes with different numbers of mines.

![Skärmavbild 2024-02-22 kl  09 30 19](https://github.com/axel-nyman/Minesweeper/assets/96598978/9e916c80-83da-4d21-b311-7f431e05e9e5)
![Skärmavbild 2024-02-22 kl  09 30 38](https://github.com/axel-nyman/Minesweeper/assets/96598978/5b5bfc60-dadd-4324-8f05-abfe81a54f65)
![Skärmavbild 2024-02-22 kl  09 30 45](https://github.com/axel-nyman/Minesweeper/assets/96598978/2d839ef8-99ab-4191-bc5d-a699d53ae81e)
![Skärmavbild 2024-02-22 kl  09 30 52](https://github.com/axel-nyman/Minesweeper/assets/96598978/7bab196f-0bed-4d69-94d3-7c63dd151f8f)


The objective is to clear out the entire board and locate the hidden mines. This is done by left-clicking tiles that the player thinks doesn't have mines, and either avoiding or right-clicking (marks out the tile with a flag) tiles that the player suspects has mines. When a tile not containing a mine is clicked it reveals how many mines are located in the eight adjacent tiles. If there are no mines adjacent to the clicked tile, the game automatically "clicks" all of the adjacent tiles until tiles that do have mines adjacent to them are located. The game is lost by clicking a tile containing a mine, and won by clearing all tiles not containing mines.

## Features
### Mine counter
On the top left is a counter representing how many mines a given board has. By right-clicking and marking tiles with flags the counter goes down. This way the player can keep track of how many mines are left to discover (assuming the player has marked the correct tiles).

### Game state
In the middle of the top bar is a smileyface representing the current game state. The face reacts to the player clicking tiles, and will show if the game is either lost or won.

### Timer
On the top right is a timer that starts when the player clicks their first tile. This way, the game isn't only about clearing out all the tiles, but also about doing so in an as short amount of time as possible.
