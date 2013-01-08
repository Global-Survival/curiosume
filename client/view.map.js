function renderMap(s, o, v) {
    var e = uuid();
    $('<div style="width: 100%; height: 100%"/>').attr('id', e).appendTo(v);
    initLocationChooserMap(e);
}
