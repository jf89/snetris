var WIDTH = 10;
var HEIGHT = 20;

var RIGHT = 0;
var DOWN = 1;
var LEFT = 2;
var UP = 3;

var TILES = {
	empty:   0,
	red:     1,
	yellow:  2,
	aqua:    3,
	green:   4,
	blue:    5,
	white:   6,
	magenta: 7
};

var BLOCKS = [
	{
		sprite: TILES.yellow,
		shape: [
			[ 1, 1 ],
			[ 1, 1 ]
		]
	},
	{
		sprite: TILES.magenta,
		shape: [
			[ 0, 1, 0 ],
			[ 1, 1, 1 ],
			[ 0, 0, 0 ]
		]
	},
	{
		sprite: TILES.red,
		shape: [
			[ 0, 0, 1 ],
			[ 0, 1, 1 ],
			[ 0, 1, 0 ]
		]
	},
	{
		sprite: TILES.green,
		shape: [
			[ 1, 0, 0 ],
			[ 1, 1, 0 ],
			[ 0, 1, 0 ]
		]
	},
	{
		sprite: TILES.blue,
		shape: [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 1, 1, 0 ]
		]
	},
	{
		sprite: TILES.white,
		shape: [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 0, 1, 1 ]
		]
	},
	{
		sprite: TILES.aqua,
		shape: [
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ]
		]
	}
];

var SNAKE_SPRITES = {
	hn:  9, he: 10, hs: 11, hw:  8,
	tn: 15, te: 14, ts: 13, tw: 12,
	ne: 16, ns: 18, nw: 17,
	se: 21, sw: 20,
	ew: 19
};
