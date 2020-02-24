const Tile = require('../src/tile')

let tile

describe('Tile', () => {
  beforeEach(() => {
    tile = new Tile()
  })

  test('default state', () => {
    expect(tile.hidden).toEqual(true)
    expect(tile.flagged()).toEqual(false)
    expect(tile.armed()).toEqual(false)
  })

  test('it is armed', () => {
    tile.arm()
    expect(tile.armed()).toEqual(true)
  })

  test('it is flagged', () => {
    tile.flag()
    expect(tile.flagged()).toEqual(true)
    expect(tile.hidden).toEqual(true)
  })

  test('it is cleared when pressed', () => {
    tile.press();
    expect(tile.hidden).toEqual(false)
    expect(tile.cleared()).toEqual(true)
  })

  test('it detonated', () => {
    tile.arm()
    tile.press();
    expect(tile.hidden).toEqual(false)
    expect(tile.detonated()).toEqual(true)
  })
})