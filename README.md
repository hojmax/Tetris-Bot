# Tetris Bot
## 📝 Description
This project is an implementation of a bot which can play automatically by performing tetrises[^1]. The bot looks recursively **n** moves into the future, evaluates the board, and chooses the move which leads to the board state with the best score. This is achieved by bruteforcing combinations of pieces in the queue not resulting in holes. This includes swapping pieces in and out of the hold queue. 

![](/images/playing.gif)

[^1]: A 'tetris' refers to clearing 4 lines simultaneously. This can only be done by dropping an **i** piece.

## 🖥 [Live Demo](https://hojmax.github.io/Tetris-Bot/)

## 🚧 Limitations
It is to be mentioned that this bot fails on the first move approximately 6.7% of the time. This is due to the fact that any combinations of the **s** and **z** piece in the first 2 positions of the queue, or the **s**, **z**, and **o** piece in the first 3 positions, will not leave any moves resulting in no holes[^2]. There is a very simple way of handling this exception which I employed in a previous version of the Tetris bot. You can place the troubling piece left-most and rotate it in such a manor that the resulting holes always land in the empty column. This can be used to not only the resolve the starting exception, but also prolong the point of no valid moves. This is currently not implemented.

[^2]: If you are unfamiliar with the piece names (i.e. **s**, **z** and so on), you can read [here](https://en.wikipedia.org/wiki/Tetromino#One-sided_tetrominoes).
## 🏄‍♂️ Usage
As this project is built using vanilla javascript, all you need is to open `index.html` in your browser. Press **SPACE** for placing pieces one at a time, and **R** for repeated placements. Note that the bot only places a piece if there is an avalaible move that results in no holes and respects the height limit. Refresh the page in case it gets stuck.
