## Description

Conway’s Game of Life is a zero-player game, meaning that its evolution is determined by its
initial state, requiring no further input. One interacts with the Game of Life by creating an
initial configuration and observing how it evolves, or, for advanced "players", by creating
patterns with particular properties.
The universe of the Game of Life is a two-dimensional orthogonal grid of square cells, each
of which is in one of two possible states, alive or dead. Every cell interacts with its eight
neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At
each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by over-population.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

All cells outside the grid are considered to be dead.

See [Conway's_Game_of_Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) for more information

## Implementation details

To start the game click "Start" button. Note that <Survived generations> stops counting
when there are no changes on the grid i.e. if no cells die or get reborn.

Build with React v17

## To do

1. Add tests
2. Setup travis integration
