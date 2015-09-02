/*
 * TextItemComponent
 *
 * Options:
 * {
 *  fontPicker: {}, //fontPicker configuration
 *  colorPicker: {}, //colorPicker configuration
 *  onRender: function(componentDOM){},
 *  onChange: function(textInfo){},
 *  onRemove: function(){}
 * }
 */
(function (module) {
    if (typeof define === "function" && define.amd) {
        define(['jquery', 'color-picker', 'font-picker'], function ($, ColorPicker, FontPicker) { 
          return module.component($, ColorPicker, FontPicker); 
        });
    } else {
        window.TextItemComponent = module.component($, ColorPickerComponent, FontPickerComponent);
    }
}({
  component: function($, CP, FP){

    /*
     * Creates component and adds to page
     *
     * value: An initial text value to manage
     * opts: Configuration for text item, sub-pickers
     */
    var TextItemComponent = function(opts){
      var els = {};

      var textItem = {
        value: (opts.bindTo) ? opts.bindTo.text() : '',
        font: {},
        color: null
      }

      var opts = opts || {};

      opts.events = opts.events || {};

      els.container = $('<div class="text-item-component">');

      /*
       * Update bindings
       */
      var updateBindings = function(){
        if(opts.bindTo){
          opts.bindTo.css('font-family', textItem.font.family);
          opts.bindTo.css('font-size', textItem.font.size);
          opts.bindTo.css('color', textItem.color);
          opts.bindTo.text(textItem.value);
        }
      }

      /*
       * General change function to fire on change
       */
      var change = function(){
        updateBindings();
        els.container.trigger('text-item:change', textItem);
      }

      /*
       * Create an event to fire on change, should fire user provided onChange as well
       */
      els.container.on('text-item:change', function(event, textItem){
        if(opts.events.onChange){
          opts.events.onChange(textItem);
        }
      });

      /*
       * Create the input to store the value
       */
      els.input = $('<input type="text" class="text-item-input" />');
      els.input.val(opts.initialValue || (opts.bindTo ? opts.bindTo.text() : ''));
      els.input.on('keyup', function(e){
        var value = $(e.target).val();
        //opts.bindTo.text(value);
        textItem.value = value;
        change();
      });
      els.container.append(els.input);

      /*
       * Create the font picker
       */
      if(!opts.fontPicker){
        throw new Error("Font picker must have opts provided!");
      }

      if(opts.fontPicker.length < 2) opts.fontPicker.push({});

      if(!opts.fontPicker[1].attachTo) opts.fontPicker[1].attachTo = els.container;

      var FontPicker = FP.apply(null, opts.fontPicker);

      FontPicker.els.container.on('font:change', function(event, font){
        textItem.font = font;
        change();
      });

      textItem.font = {
        family: opts.fontPicker[1].fontDefault || opts.fontPicker[0][0],
        size: (opts.fontSize && opts.fontSize.default) ? opts.fontSize.default : 'inherit'
      }

      els.fontPicker = FontPicker.els.container;

      /*
       * Create the color picker
       */
      if(!opts.colorPicker) opts.colorPicker = {};

      if(!opts.colorPicker.attachTo) opts.colorPicker.attachTo = els.container;

      opts.colorPicker.onChange = function(color){
        textItem.color = color;
        change();
      }

      var ColorPicker = new CP(opts.colorPicker);
      textItem.color = opts.colorPicker.color || opts.colorPicker.defaultColor || '#000';

      els.colorPicker = ColorPicker.el;

      /*
       * Fire the first change callback now that defaults have loaded
       */
      change();

      /*
       * attach parent node to dom
       */
      if(opts.attachTo){
        if(opts.attachTo instanceof $){
          opts.attachTo.append(els.container);
        } else {
          opts.attachTo.appendChild(els.container);
        }

        if(opts.events.onRender){
          opts.events.onRender(els.container);
        }
      }

      /*
       * Public API for component
       */
      return {
        els: els,
        remove: function(){ //Detach the component and all listeners
          if(opts.onRemove) opts.onRemove();
          els.container.remove();
        }
      }
    };

    return TextItemComponent;

  }
}));
