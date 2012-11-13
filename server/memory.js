var util = require('../client/util.js');

function newAttention(memoryMomentum) {
	var that = {
			momentum: memoryMomentum,
			since: { },
			values: { },
			totals: { },
			summary: function() { return [ this.values, this.totals ]; },
			notice : function(o, strength) {
				var prevStrength = this.values[o];				
				var prevSince = this.since[o];
				
				if (this.values[o] == undefined) {
					this.values[o] = 0;
				}
					
				this.values[o] += strength;
				
				var now = Date.now();
				if (prevStrength != undefined) {
					var dt = now - prevSince;
					if (this.totals[o] == undefined) {
						this.totals[o] = 0;
					}
					this.totals[o] += dt * 0.5 * (strength + prevStrength);
				}
				
				this.since[o] = now;
				
				
			},
			refresh: function(o) {
				this.notice(o, 0);
			},
			update : function() {
				//refresh
				for (k in this.values) {
					this.refresh(k);
				}
				
				//FORGET: decrease and remove lowest
				for (k in this.values) {
					this.values[k] *= memoryMomentum;
				}
				
				//SPREAD: ...
				
			}
	};
	
	
	return that;
}

exports.Attention = newAttention();

/*var a = newAttention(0.5);
a.update();
console.log(a.summary());
a.notice('a', 1.0);
console.log(a.summary());
a.update();
console.log(a.summary());
a.notice('b', 1.0);
console.log(a.summary());
a.update(); console.log(a.summary());
a.update(); console.log(a.summary());*/

