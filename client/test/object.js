/*test( "hello test", function() {
  ok( 1 == "1", "Equality passed!" );
  ok( 0 == "1", "Failed!" );
});*/

test("New objects", function() {
    ok( objNew().id, "Generate ID randomly when none specified" );

    var s = "specificID";
    strictEqual(s, objNew(s).id, "object ID may be specifid");


    ok( objNew().createdAt, "Has createdAt metadata");
});

test("Object editing", function() {
   
    
    var x = objNew();
    var y = { id: 'tag'  };
    
    objAddValue(x, y );   
    ok( x.modifiedAt, "modifiedAt updates on object change" );
    ok( x.value.length == 1, "value object added to object");
    
    {
        var z = { id: 'property', value: 'value'  };
        objAddValue(y, z);
        ok(x.value[0].value, "attache sub-object" );
    }
    
    {
        objAddDescription(x, 'described');
        ok(x.value.length == 2, 'description added to value list');
        strictEqual(objDescription(x), 'described', 'description readable');
    }
    
    objRemoveValue(x, 0);
    ok( x.value.length == 1, "value object removed from object");    
    
    
    ok( !objName(x), "object has no default name" );
    strictEqual( objName(objName(x, 'named')) , 'named', "object name may be specified" );
    
});