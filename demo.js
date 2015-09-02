var b = function(path){
  return 'bower_components/'+path;
}
requirejs.config({
  paths: {
    jquery: b('jquery/dist/jquery.min'),
    "onecolor": b("color/one-color-all"),
    "scale.fix": b("colorjoe/js/scale.fix"),
    "colorjoe": b("colorjoe/dist/colorjoe"),
    "css": "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.8/css.min",
    "webfontloader": b('webfontloader/webfontloader'), 
    "selector-list-component": b('selector-list-component/main'), 
    "color-picker": b('color-picker-component/main'), 
    "font-picker": b('font-picker-component/main')
  }
});

define(["main", "css!./bower_components/colorjoe/css/colorjoe"], function(TextItemComponent) {
  var c = new TextItemComponent({
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
    ],
    attachTo: $('#container'),
    bindTo: $('#bindme')
  });
});
