var util = require('../client/util.js');

function Attention(memoryMomentum) {
	var that = {
			momentum: memoryMomentum,
			since: { },
			values: { },
			totals: { },
			summary: function() { return [ this.values, this.totals ]; },
			notice : function(o, strength) {
				var i = o.uuid;
				
				var prevStrength = this.values[i];				
				var prevSince = this.since[i];
				
				if (this.values[i] == undefined) {
					this.values[i] = 0;
				}
					
				this.values[i] += strength;
				
				var now = Date.now();
				if (prevStrength != undefined) {
					var dt = now - prevSince;
					if (this.totals[i] == undefined) {
						this.totals[i] = 0;
					}
					this.totals[i] += dt * 0.5 * (strength + prevStrength);
				}
				
				this.since[i] = now;
				
				
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


exports.Attention = Attention;

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

