# tetrisBot-2.0

The bot offers automatic playing using the standard Tetris-clear strategy. This is achieved by bruteforcing combinations of pieces not resulting in gaps and evaluating the resulting boards to a given score. This is done recursively and the bot can search N moves into the future. 
## Live Demo
https://hojmax.github.io/tetrisBot-2.0/

## Testing
The tests below show how many lines were cleared before the bot was unable to find a move under the height limitation with no gaps where N = 3: 
Test | 1 | 2 | 3 | 4 | 5
--- | --- | --- | --- |--- |---
Lines cleared | 3164 | 3644 | 672 | 6028 | 4164

It is to be mentioned that this bot fails at the first move approximately 6.7% of the time. This is due to the fact that any combinations of the s and z piece in the first 2 positions of the queue, or the s, z, and o piece in the first 3 positions, will not leave any moves resulting in no gaps. There is a very simple way of handling this exception (placing the troubling piece left-most and ensuring that all of the resulting gaps land in the empty column.) which I employed in my earlier version of the Tetris bot. This can be used to not only the resolve the starting exception, but also prolong the point of no valid moves. This is currently not implemented.
