function renderPlan(target) {
    var d = newSelfTimeList(self.myself(), target);
    target.append(d);
    return d;
}

function newSelfTimeList(x, container) {

    var s = self;
    var plan = x.plan;
    if (!plan)
        plan = { };
    
    var numHours = 72;

    function save() {
        if (x.id !== s.myself().id)
            return;
        plan = { };
        for (var i = 0; i < numHours; i++) {
            var tt = planSlotTimes[i];
            if (planSlots[i].length > 0)
                plan[tt] = planSlots[i];
            
        }
        container.html(newSelfTimeList(self.myself(),container));
        
        later(function() {
            saveSelf(function(m) {
               m.plan = plan; 
               return m;
            });
        });
        /*s.notice(me);
        s.pub(me, function(err) {
            $.pnotify({
               title: 'Unable to save Self.',
               type: 'Error',
               text: err
            });           
        }, function() {
            $.pnotify({
               title: 'Self Saved.'            
            });           
        });*/
    }
    
    var planTimes = _.keys(plan);
    
    var time = new Date();
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    time = time.getTime();
    
    var d = newDiv();
    
    var planSlotTimes = { };
    var planSlots = { };
    
    var centroidTimes = self.objectsWithTag('PlanCentroid');
    if (!centroidTimes) centroidTimes = [];
    
    for (var i = 0; i < numHours; i++) {
        var endtime = time + 60.0 * 60.0 * 1000.0 * 1.0;
        var timed = new Date(time);
        var rowHeader = newDiv();
        rowHeader.addClass('SelfTimeRowHeader');
        
        if (i % 12 == 0) {
            rowHeader.html(timed.toLocaleDateString() + ': ' + timed.toLocaleTimeString());            
        }
        else {
            rowHeader.html(timed.toLocaleTimeString());                        
        }
        
        var t = newDiv();
        t.addClass('SelfTimeWantToPeriod');
        
        var u = newDiv();
        u.addClass('SelfTimeCouldDoPeriod');
        
        
        var plans = [];
        var centroids = [];
        for (var k = 0; k < centroidTimes.length; k++) {
            var pp = centroidTimes[k];
            var ppo = self.object(pp);
            var ppw = objWhen(ppo);
            if ((ppw >= time) && (ppw < endtime))
                centroids.push(ppo);
        }
        
        for (var k = 0; k < planTimes.length; k++) {
            var pp = planTimes[k];
            if ((pp >= time) && (pp < endtime))
                plans = plans.concat(plan[pp]);
        }
        planSlotTimes[i] = time;
        planSlots[i] = _.unique(plans);
        
        t.append('&nbsp;');
        _.each(plans, function(p) {
            t.append(newTagButton(p));
            t.append('&nbsp;');
        });
        
        _.each(centroids, function(c) {
            u.append(renderObjectSummary(c));
        });
        
        if (plans.length > 0)
            t.addClass('SelfTimeFilled');

        if (x.id === s.myself().id) { //only edit own plan
            (function(i, time, endtime) {
                t.click(function() {
                    var targetTime = (time + endtime)/2.0;
                    var d = newPopup("Select Tags for " + new Date(targetTime), {width: 300, modal: true});
                    d.append(newTagChooserWidget(targetTime, planSlots[i], function(results) {
                        planSlots[i] = results;
                        later(function() {
                            save();                    
                            d.dialog('close');                        
                        });
                        //container.html(newSelfTimeList(s, x, container));
                    }));
                });
            })(i, time, endtime);
        }
        
        d.append(rowHeader);
        d.append(t);
        d.append(u);
        time = endtime;
    }
    
    return d;
}
