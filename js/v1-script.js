// init canvas
var     canvas = $( 'canvas' )               
  ,        ctx = canvas[0].getContext( '2d' ) // world
  ,       ctx2 = canvas[1].getContext( '2d' ) // fog
  ,      mDown = false
  ,         r1 = 100
  ,         r2 = 300
  ,    density = .4
  , hideOnMove = true
  ,   hideFill = 'rgba( 0, 0, 0, .7 )'
  ,    overlay = 'rgba( 0, 0, 0, 1 )'
  ;

if( !hideOnMove ){
  // shouldn't be done like this, but this is a demo
  canvas.get(1).remove();
}

// black out the canvas
ctx.fillStyle = overlay;
ctx.fillRect( 0, 0, 1280, 800 );

// set up our "eraser"
ctx.globalCompositeOperation = 'destination-out';

canvas.last().on('mousemove', function( ev, ev2 ){
    
    ev2 && ( ev = ev2 );
    
    var pX = ev.pageX
      , pY = ev.pageY
      ;

    // reveal wherever we drag
    var radGrd = ctx.createRadialGradient( pX, pY, r1, pX, pY, r2 );
    radGrd.addColorStop(       0, 'rgba( 0, 0, 0,  1 )' );
    radGrd.addColorStop( density, 'rgba( 0, 0, 0, .1 )' );
    radGrd.addColorStop(       1, 'rgba( 0, 0, 0,  0 )' );
    
    ctx.fillStyle = radGrd;
    ctx.fillRect( pX - r2, pY - r2, r2*2, r2*2 );
    
    // partially hide the entire map and re-reval where we are now
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.clearRect( 0, 0, 1280, 800 );
    ctx2.fillStyle = hideFill;
    ctx2.fillRect ( 0, 0, 1280, 800 );

    var radGrd = ctx.createRadialGradient( pX, pY, r1, pX, pY, r2 );
    radGrd.addColorStop(  0, 'rgba( 0, 0, 0,  1 )' );
    radGrd.addColorStop( .8, 'rgba( 0, 0, 0, .1 )' );
    radGrd.addColorStop(  1, 'rgba( 0, 0, 0,  0 )' );

    ctx2.globalCompositeOperation = 'destination-out';
    ctx2.fillStyle = radGrd;
    ctx2.fillRect( pX - r2, pY - r2, r2*2, r2*2 );

  })
  .trigger( 'mousemove', {pageX: 150, pageY:150 });