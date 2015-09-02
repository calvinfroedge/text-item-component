#TextItem Component

This component blends the [Selector List](https://github.com/calvinfroedge/selector-list-component), [Font Picker](https://github.com/calvinfroedge/font-picker-component), and [Color Picker](https://github.com/calvinfroedge/ColorPickerComponent) components into a single component that binds to a text element such as an `h1:n`, `p`, `span` tag, etc. It provides one way data binding and change events so that if the content is changed via a text box, or the color or font family / size is selected, a change event is fired and the bound text item updates.

It exposes the underlying APIs for the `selector-list-component`, `font-picker-component` and `color-picker-component` via its configuration object. As an example:

```
  var c = new TextItemComponent({
    colorPicker: {
      defaultColor: '#000',
      color: '#bbb'
    },
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
    bindTo: $('#bindme'),
    onChange: function(newValue){
      console.log('font is', newValue.font, 'color is', newValue.color);
    }
  });
```

You can review the APIs for the associated components to find options for customizing each.
