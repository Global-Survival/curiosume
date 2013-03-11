/*test( "hello test", function() {
  ok( 1 == "1", "Equality passed!" );
  ok( 0 == "1", "Failed!" );
});*/

test("New objects", function() {
    ok( objNew().id, "Generate ID randomly when none specified" );

    var s = "specificID";
    strictEqual(s, objNew(s).id, "Use specified ID");
    
});