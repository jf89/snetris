var WIDTH = 10;
var HEIGHT = 20;

var BLOCKS = [
	{
		sprite: 'block_r.png',
		shape: [
			[ 1, 1 ],
			[ 1, 1 ]
		]
	},
	{
		sprite: 'block_g.png',
		shape: [
			[ 0, 1, 0 ],
			[ 1, 1, 1 ],
			[ 0, 0, 0 ]
		]
	},
	{
		sprite: 'block_b.png',
		shape: [
			[ 0, 0, 1 ],
			[ 0, 1, 1 ],
			[ 0, 1, 0 ]
		]
	},
	{
		sprite: 'block_y.png',
		shape: [
			[ 1, 0, 0 ],
			[ 1, 1, 0 ],
			[ 0, 1, 0 ]
		]
	},
	{
		sprite: 'block_c.png',
		shape: [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 1, 1, 0 ]
		]
	},
	{
		sprite: 'block_w.png',
		shape: [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 0, 1, 1 ]
		]
	},
	{
		sprite: 'block_n.png',
		shape: [
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ]
		]
	}
];

var SNAKE_SPRITES = {
	hn: 'hn.png', he: 'he.png', hs: 'hs.png', hw: 'hw.png',
	tn: 'tn.png', te: 'te.png', ts: 'ts.png', tw: 'tw.png',
	ne: 'ne.png', ns: 'ns.png', nw: 'nw.png',
	se: 'se.png', sw: 'sw.png',
	ew: 'ew.png'
};

var TILES = {
	empty: 1
};
