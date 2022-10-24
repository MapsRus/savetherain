/* 

A bar chart made out of pictures, using the Google Visalization API.
Each picture has a head, and a tail that has a length proportional to the bar size.

Data Format
  First column string (label)
  Second column number (value)
  or
  Onw row of numbers

Configuration options:
  min: The minimal value (default=0)
  max: The maximal value (default=actual maximal value)
  title: Text for a title above the chart (default=none)
  canSelect: Boolean, if true, users can click on bars
  width: width in pixels or as percent from parent container (default = '100%')
  type: Name (case insensitive) of image type. Supported types are:
    Train
    Chocolate
    Rope
    Truffle
    Worm
    Horse

Methods
  setSelection
  getSelection

Events
  select

*/

BarsOfStuff = function(container) {
  this.container = container;
  
  this.bars = []; 
  this.uid = BarsOfStuff.nextId++;
  this.selection = [];
};

// Global constant to prevent namespace collision between 2 chart
BarsOfStuff.nextId = 0;

BarsOfStuff.protocol = 'https:' == document.location.protocol ? 'https:' : 'http:';

BarsOfStuff.STYLES = [
  {name:'train', img: 'train.png', height: 36, headImg: 'train_head.png', headWidth: 75},
  {name:'chocolate', img: 'chocolate.png', height: 48, headImg: 'chocolate_head.png', headWidth: 41},
  {name:'wheat', img: 'wheat.png', height: 40},
  {name:'rice', img: 'rice2.png', height: 40},
  {name:'corn', img: 'corn.png', height: 40},
  {name:'beans', img: 'beans2.png', height: 40}
];

BarsOfStuff.IMGPATH = BarsOfStuff.protocol + 'images/';

//BarsOfStuff.IMGPATH = BarsOfStuff.protocol + '//visapi-gadgets.googlecode.com/svn/trunk/image/';

BarsOfStuff.prototype.escapeHtml = function(text) {
  if (text == null) {
    return '';
  }
  return text.replace(/&/g, '&amp;').
      replace(/</g, '&lt;').
      replace(/>/g, '&gt;').
      replace(/"/g, '&quot;');
};

BarsOfStuff.prototype.draw = function(data, options) {
  var container = this.container;
  var rows = data.getNumberOfRows();
  if (rows < 1) {
    container.innerHTML = 'Error: No data (no rows)';
    return;
  }
        
  var bars = [];
  this.bars = bars;        
  var cols = data.getNumberOfColumns();
  if (cols >= 2 && data.getColumnType(0) == 'string' && data.getColumnType(1) == 'number') {
    // Labels column and values column
    for (var rowInd = 0; rowInd < rows; rowInd++) {
      var v = data.getValue(rowInd, 1);
      if (v >= 0) {
        bars.push({value: v, formatted: data.getFormattedValue(rowInd, 1), 
            label: data.getValue(rowInd, 0), dataRow: rowInd});
      }
    }
  } else {
    // Column labels and a single values row
    for (var colInd = 0; colInd < cols; colInd++) {
      if (data.getColumnType(colInd) == 'number') {
        var v = data.getValue(0, colInd);
        if (v >= 0) {
          bars.push({value: v, formatted: data.getFormattedValue(0, colInd),
             label: data.getColumnLabel(colInd), dataCol: colInd});
        }
      }
    }
  }
        
  if (bars.length < 1) {
    container.innerHTML = '<span class="barsofmoney-error">Bars-of-Stuff Error: Expecting some numeric values</span>';
    return;
  }
        
  var minValue = 0;
  var maxValue = bars[0].value;
  for (var i = 1; i < bars.length; i++) {
    maxValue = Math.max(maxValue, bars[i].value);
  }

  var prefMinValue = options['min'];
  var prefMaxValue = options['max'];
  if (prefMinValue != null || prefMaxValue != null) {
    var min = prefMinValue || 0;
    var max = prefMaxValue || maxValue;
    if (min >= 0 && max > 0 && min < max) {
      minValue = min;
      maxValue = max;
    }
  }

  var range = maxValue - minValue;
  
  var styleInd = 0;
  var type = options['type'];
  if (type) {
    type = type.toLowerCase();
    for (var i = 0; i < BarsOfStuff.STYLES.length; i++) {
      if (BarsOfStuff.STYLES[i].name == type) {
        styleInd = i;
        break;
      }
    }  
  }
        
  var chartStyle = BarsOfStuff.STYLES[styleInd];

  // Set up the skeleton table
  var html = [];

  var width = options['width'] || '100%';
  html.push('<table width="', width, '">');  

  var header = options['title'];
  if (header) {
    html.push('<tr><td colspan="', bars.length, '" class="barsofstuff-title">', 
        this.escapeHtml(header), '</td></tr>');
  }

  for (var i = 0; i < bars.length; i++) {
    var bar = bars[i];
    var barDomId = 'pilesofmoney-b-' + this.uid + '-' + i; 
    bars[i].domId = barDomId;
    html.push('<tr><td class="barsofstuff-label" width="10%" height="', chartStyle.height, '">',
        '<b>', this.escapeHtml(bar.label), '</b>', 
        '<br />', this.escapeHtml(bar.formatted), 
        '</td>');
    html.push('<td id="', barDomId, '" width="95%" nowrap="true"></td></tr>');
  }
  html.push('</table>');
  container.innerHTML = html.join('');

  // Measure the effective width for charts
  var headWidth = chartStyle.headWidth || 0;
  var maxImgWidth = document.getElementById(bars[0].domId).offsetWidth - 24; // To allow adding a scrollbar
  maxImgWidth = Math.max(maxImgWidth, headWidth + 100);
  var maxBarWidth = maxImgWidth - headWidth;

  // Draw the bars
  for (var i = 0; i < bars.length; i++) {
    var bar = bars[i];
    var v = Math.max(0, bar.value);
    var pct = range == 0 ? 0 : Math.min(1, (v - minValue) / range);
    var barWidth = Math.round(pct * maxBarWidth);
    html = [];
    if (headWidth > 0) {
      html.push('<table cellpadding="0" cellspacing="0"><tr><td>');
    }
    html.push('<div style="width: ',
        barWidth,
        'px; height: ',
        chartStyle.height,
        'px; background: url(',
        BarsOfStuff.IMGPATH, chartStyle.img,
        ') repeat top right;"></div>');
    if (headWidth > 0) {
      html.push('</td><td><img src="',
          BarsOfStuff.IMGPATH, chartStyle.headImg,
          '" width="', headWidth, '" height="',
          chartStyle.height, '" /></td></tr></table>');
    }
    document.getElementById(bar.domId).innerHTML = html.join('');
  }
  
  // Draw the current selection
  this.setSelection(this.selection);

  // Attach event handlers if clickable
  if (options.canSelect !== false) {
    for (var i = 0; i < bars.length; i++) {
      var bar = bars[i];
      var td = document.getElementById(bar.domId);
      td.style.cursor = 'pointer';
      td.onclick = this.createListener(bar.dataRow, bar.dataCol);
    }  
  }
};

BarsOfStuff.prototype.createListener = function(row, col) {
  var self = this;
  return function() { self.handleClick(row, col); }
};

BarsOfStuff.prototype.handleClick = function(row, col) {
  this.setSelection([{row:row, col:col}]);
  google.visualization.events.trigger(this, 'select', {});
};

BarsOfStuff.prototype.getSelection = function() {
  return this.selection;
};

BarsOfStuff.prototype.setSelection = function(coords) {
  if (!coords) {
    coords = [];
  }
  this.selection = coords;
  var bars = this.bars;
  for (var i = 0; i < bars.length; i++) {
    var bar = bars[i];
    var className = 'barsofstuff-bar';
    for (var c = 0; c < coords.length; c++) {
      var rowInd = coords[c].row;
      var colInd = coords[c].col;
    if ((rowInd != null && bar.dataRow == rowInd) || 
        (colInd != null && bar.dataCol == colInd)) {
      className += 'hi';
      break;
    }  
    }
    var td = document.getElementById(bar.domId);
    if (td.className != className) {
      td.className = className;
    }
  }
}
