const dropcss = require('../../dist/dropcss.cjs.js');
const assert = require('assert');

describe('Context-aware, unary selector', () => {
	let html, css;

	describe(' ', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span><a></a></span></div>',
				css:	'div a {a:b;}',
			});
			assert.equal(out, 'div a{a:b;}');
		});

		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span><a></a></span></div>',
				css:	'span a {a:b;}',
			});
			assert.equal(out, 'span a{a:b;}');
		});

		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span><a></a></span></div>',
				css:	'div span a {a:b;}',
			});
			assert.equal(out, 'div span a{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><span><a></a></span></div>',
				css:	'span div {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe('>', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span><a></a></span></div>',
				css:	'div > span {a:b;}',
			});
			assert.equal(out, 'div > span{a:b;}');
		});

		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span><a></a></span></div>',
				css:	'span > a {a:b;}',
			});
			assert.equal(out, 'span > a{a:b;}');
		});

		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span><a></a></span></div>',
				css:	'div > span > a {a:b;}',
			});
			assert.equal(out, 'div > span > a{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><span><a></a></span></div>',
				css:	'div > a {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe('+', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span><a></a></div>',
				css:	'span + a {a:b;}',
			});
			assert.equal(out, 'span + a{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span><a></a></div>',
				css:	'a + span {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe('~', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><i></i><span></span><a></a></div>',
				css:	'i ~ a {a:b;}',
			});
			assert.equal(out, 'i ~ a{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><i></i><span></span><a></a></div>',
				css:	'a ~ i {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':nth-child()', () => {
		it('should retain "odd"', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span></div>',
				css:	'span:nth-child(odd) {a:b;}',
			});
			assert.equal(out, 'span:nth-child(odd){a:b;}');
		});

		it('should retain "2n+1"', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span></div>',
				css:	'span:nth-child(2n+1) {a:b;}',
			});
			assert.equal(out, 'span:nth-child(2n+1){a:b;}');
		});

		it('should retain "1"', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span><i></i></div>',
				css:	'span:nth-child(1) {a:b;}',
			});
			assert.equal(out, 'span:nth-child(1){a:b;}');
		});

		it('should drop "even"', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span></div>',
				css:	'span:nth-child(even) {a:b;}',
			});
			assert.equal(out, '');
		});

		it('should drop "2"', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span><i></i></div>',
				css:	'span:nth-child(2) {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':nth-last-child()', () => {
		it('should retain "2n+1"', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span></div>',
				css:	'span:nth-last-child(2n+1) {a:b;}',
			});
			assert.equal(out, 'span:nth-last-child(2n+1){a:b;}');
		});
	});

	describe(':first-child', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span><a></a></div>',
				css:	'span:first-child {a:b;}',
			});
			assert.equal(out, 'span:first-child{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span><a></a></div>',
				css:	'a:first-child {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':only-child', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span></div>',
				css:	'span:only-child {a:b;}',
			});
			assert.equal(out, 'span:only-child{a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span><span></span></div>',
				css:	'span:only-child {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':has(<tag>)', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><span></span></div>',
				css:	':has(span) {a:b;}',
			});
			assert.equal(out, ':has(span){a:b;}')
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div></div>',
				css:	':has(span) {a:b;}',
			});
			assert.equal(out, '');;
		});
	});

	describe(':has(#id)', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><div id="a"></div></div>',
				css:	':has(#a) {a:b;}',
			});
			assert.equal(out, ':has(#a){a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><div id="b"></div></div>',
				css:	':has(#a) {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':has(.class)', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><div class="a"></div></div>',
				css:	':has(.a) {a:b;}',
			});
			assert.equal(out, ':has(.a){a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><div class="b"></div></div>',
				css:	':has(.a) {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':has([attr])', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><div foo></div></div>',
				css:	':has([foo]) {a:b;}',
			});
			assert.equal(out, ':has([foo]){a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><div bar></div></div>',
				css:	':has([foo]) {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	// todo: test [foo="val"], [foo='val']
	describe(':has([attr=value])', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><div foo="bar"></div></div>',
				css:	':has([foo=bar]) {a:b;}',
			});
			assert.equal(out, ':has([foo=bar]){a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><div foo="cow"></div></div>',
				css:	':has([foo=bar]) {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':has([attr*=value])', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><div foo="bar"></div></div>',
				css:	':has([foo*=a]) {a:b;}',
			});
			assert.equal(out, ':has([foo*=a]){a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><div foo="bar"></div></div>',
				css:	':has([foo*=c]) {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':has([attr^=value])', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><div foo="bar"></div></div>',
				css:	':has([foo^=b]) {a:b;}',
			});
			assert.equal(out, ':has([foo^=b]){a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><div foo="bar"></div></div>',
				css:	':has([foo^=c]) {a:b;}',
			});
			assert.equal(out, '');
		});
	});

	describe(':has([attr$=value])', () => {
		it('should retain present', function() {
			let {css: out} = dropcss({
				html:	'<div><div foo="bar"></div></div>',
				css:	':has([foo$=r]) {a:b;}',
			});
			assert.equal(out, ':has([foo$=r]){a:b;}');
		});

		it('should drop absent', function() {
			let {css: out} = dropcss({
				html:	'<div><div foo="bar"></div></div>',
				css:	':has([foo$=z]) {a:b;}',
			});
			assert.equal(out, '');
		});
	});
});
