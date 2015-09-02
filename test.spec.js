describe('component', function(){
  var TextItemComponent = window.TextItemComponent;
  var el = $('body');

  /*
   * Return TextItemComponent
   */
  var tic = function(obj){
    return new TextItemComponent($.extend({
      attachTo: el,
      bindTo: $('#bindme'),
      fontPicker: [
        ['Droid Sans', 'Expletus Sans', 'Lora'],
        {
          fontSize: {
            min: 12,
            max: 30,
            step: 2,
            unit: 'pt'
          }       
        }
      ]
    }, obj));
  }

  /*
   * Test sync
   */
  describe('Should behave as expected on instantiation', function(){
    var cp;
    beforeEach(function(){
      cp = tic({});
    });

    it('should be a part of the dom', function(){
      expect(el.find(cp.els.container).length).toEqual(1);
    });

    it('should display the fontpicker', function(){
      expect(el.find(cp.els.fontPicker).length).toEqual(1);
    });

    it('should display the colorpicker', function(){
      expect(el.find(cp.els.colorPicker).length).toEqual(1);
    });

    it('should display the text input', function(){
      expect(el.find(cp.els.input).length).toEqual(1);
    });

    it('should have matching input and bound text', function(){
      expect($('#bindme').text()).toEqual(cp.els.input.val());
    });

    afterEach(function(){
      cp.remove();
    });
  })

  /*
   * Test async
   */ 
  describe('Should fire callbacks appropriately', function(){
    var renderCallback = false;
    var changeCallback = false;
    var cp;

    beforeEach(function(done) {
      cp = tic({
        events: {
          onRender: function(){
            renderCallback = true;
          },
         onChange: function(){
           changeCallback = true;
         }
        }
      }) 
      done();
    });

    it('Should call render callback on render', function(done){
      expect(renderCallback).toEqual(true);
      done();
    });

    it('Should call change callback on change', function(done){
      expect(changeCallback).toEqual(true);
      done();
    });

    it('Should allow listening to change event as well', function(done){
      cp.els.container.on('text-item:change', function(){
        expect(changeCallback).toEqual(true);
        expect($('#bindme').text()).toEqual('foo');
        done(); 
      }); 

      cp.els.input.val('foo');
      cp.els.input.trigger('keyup');
    });

    afterEach(function(){
      cp.remove();
    });
  });
});
