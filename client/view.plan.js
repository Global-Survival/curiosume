function renderPlan(s, target) {
    var d = newSelfTimeList(s, s.myself(), target);
    target.append(d);
    return d;
}

function newSelfTimeList(s, x, container) {

    var plan = x.plan;
    if (!plan)
        plan = { };
    
    var numHours = 72;

    function save() {
        if (x.id !== s.myself().id)
            return;
        var me = s.myself();
        plan = { };
        for (var i = 0; i < numHours; i++) {
            var tt = planSlotTimes[i];
            if (planSlots[i].length > 0)
                plan[tt] = planSlots[i];
            
        }
        me.plan = plan;
        container.html(newSelfTimeList(s,self.myself(),container));
        
        later(function() {
            $('.SelfSaveButton').click(); //HACK            
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
    
    for (var i = 0; i < numHours; i++) {
        var endtime = time + 60.0 * 60.0 * 1000.0 * 1.0;
        var timed = new Date(time);
        var t = newDiv();
        t.addClass('SelfTimePeriod');
        
        t.html(timed.toLocaleDateString() + ': ' + timed.toLocaleTimeString());
        
        var plans = [];
        for (var k = 0; k < planTimes.length; k++) {
            var pp = planTimes[k];
            if ((pp >= time) && (pp < endtime))
                plans = plans.concat(plan[pp]);
        }
        planSlotTimes[i] = time;
        planSlots[i] = _.unique(plans);
        
        t.append('<br/>');
        t.append(plans);
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
        
        d.append(t);
        time = endtime;
    }
    
    return d;
}
