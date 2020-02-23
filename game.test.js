const Game = require('./game')
const Tile = require('./tile')
let game

describe('Game', () => {
  beforeEach(() => {
    game = new Game()
  })

  test('has no status before it is started', () => {
    expect(game.status).toBeUndefined()
  })

  test('has rows', () => {
    expect(game.rows).toEqual(10)
  })

  test('has columns', () => {
    expect(game.cols).toEqual(10)
  })

  test('it has an empty tile list', () => {
    expect(game.tiles).toEqual([])
  })

  test('it is running after it starts', () => {
    game.start()
    expect(game.state).toEqual('running')
  })

  test('it loads tiles', () => {
    game.start()
    expect(game.tiles).toHaveLength(100)
    expect(game.tiles[0]).toBeInstanceOf(Tile)
  })

  test('it has a board', () => {
    game.start()
    const board = game.board();
    expect(board).toHaveLength(10)
    expect(board[0]).toHaveLength(10)
    expect(board[0][0]).toEqual('-')
  })

  test('it gets a tile by x and y coordinates', () => {
    game.start()
    // map integers so they can be tested
    game.tiles = game.tiles.map((t, i) => i);
    expect(game.tile(0, 0)).toEqual(0)
    expect(game.tile(1, 0)).toEqual(1)
    expect(game.tile(1, 2)).toEqual(21)
    expect(game.tile(3, 2)).toEqual(23)
    expect(game.tile(9, 9)).toEqual(99)
  })

  test('exposes', () => {
    game.start()

    game.expose(0, 0)
    expect(game.tiles[0].cleared()).toEqual(true)
    expect(game.board()[0][0]).toEqual('0')

    game.expose(0, 1)
    expect(game.tiles[10].cleared()).toEqual(true)
    expect(game.board()[1][0]).toEqual('0')
  })

  describe('clear closest', () => {
    beforeEach(() => game.start());

    test('clears the nearby tiles', () => {
      game.start()
      game.expose(0, 0)
      expect(game.tiles[1].cleared()).toEqual(true)
      expect(game.tiles[10].cleared()).toEqual(true)
      expect(game.tiles[11].cleared()).toEqual(true)
    })
  })
})
