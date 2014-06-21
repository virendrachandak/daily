var isIE = document.all && document.execCommand ? true : false;
var isNS = !document.all ? true : false;
var isOP = document.all && !document.execCommand ? true : false;

var objName = '';
var objs = new Array();
var lvls = new Array();
var exprHistory = new Array();
var exprHistoryIndex = -1;


function evalExpr() {
  objName = document.forms[0].elements['txtExpr'].value;
  var x = objName.split('[');
  lvls.length = 0;
  for (var i=0; i<x.length; i++)
    lvls = lvls.concat(x[i].split('.'));
  for (var i=0; i<lvls.length; i++)
    if (lvls[i].indexOf(']') == lvls[i].length-1)
      lvls[i] = lvls[i].substring(0, lvls[i].length-1);
}


function getPropsString(obj) {
  var objAttr = new Array();
/*
  var obj;
  if (eval(objName)) {
    obj = eval(objName);
  }
  else {
    alert('Could not evaluate object.');
    return;
  }
*/
  for (var elem in obj) {
    objAttr.push(elem);
  }
  objAttr = objAttr.sort();
  var s = '';
  for (var i=0; i<objAttr.length; i++) {
    try {
      if (typeof(obj[objAttr[i]]) == "function")
        s += objAttr[i] + ' = [function]\n';
      else
        s += objAttr[i] + ' = ' + obj[objAttr[i]] + '\n';
    }
    catch (e) {
      s += objs[i] + ' = [' + e.description + ']\n';
    }
  }

  var test = function () {
    this.var0 = "variable 0";
    this.var1 = 3.14159;
    this.getProp = function(x) {
      var i = 0;
      for (k in this) { if( x==i++ ) return(k); }
    }
  }
/*
  s += '\n';
  blabla = new test();
  s += blabla.getProp(2);

  var i = 0;
  for (k in obj) {
//    if (x == i++)
//      s += k + '\n';
  }
*/
  return s;
}



function getProps(keepForwardHistory) {
  if (window.opener.closed) {
    alert('The referring window has been closed.');
    return;
  }

  var obj = null;
  evalExpr();
  try {
    obj = eval('window.opener.' + objName);
  }
  catch (e) {
    alert('Could not evaluate object.');
  }
  var slct = document.forms[0].elements['evalresult'];
  slct.length = 0;
  objs.length = 0;

  if (isIE) {
    getElementsIE(slct, obj);
  }
  else if (isNS || isOP) {
    getElementsNS(slct, obj);
  }

  updateHistory(keepForwardHistory);
}

function updateHistory(keepForwardHistory) {
  // Navigation history
  if (!keepForwardHistory && exprHistory[exprHistoryIndex] != document.forms[0].elements['txtExpr'].value) {
    exprHistoryIndex++;
    exprHistory.length = exprHistoryIndex;
    exprHistory.push(document.forms[0].elements['txtExpr'].value);
  }
  var btnBack = document.forms[0].elements['btnBack'];
  var btnForward = document.forms[0].elements['btnForward'];
  if (exprHistoryIndex <= 0) {
    btnBack.disabled = true;
    btnBack.title = '';
    if (isOP)
      btnBack.style.color = 'gray';
  }
  else {
    btnBack.disabled = false;
    btnBack.title = exprHistory[exprHistoryIndex-1];
    if (isOP)
      btnBack.style.color = '';
  }
  if (exprHistoryIndex >= exprHistory.length - 1) {
    btnForward.disabled = true;
    btnForward.title = '';
    if (isOP)
      btnForward.style.color = 'gray';
  }
  else {
    btnForward.disabled = false;
    btnForward.title = exprHistory[exprHistoryIndex+1];
    if (isOP)
      btnForward.style.color = '';
  }
}

function getElementsIE(slct, obj) {
  try {
    for (var elem in obj) {
      objs.push(elem);
      var newOpt = document.createElement('OPTION');
      slct.add(newOpt, 0);      // Maintain IE4 compatibility
    }
  }
  catch (e) {
    alert('Could not evaluate object:\n' + e.description);
  }
  objs = objs.sort();
  for (var i=0; i<objs.length; i++) {
    var opt = slct[i];
    try {
      opt.name = objs[i];
      opt.innerText = objs[i] + ' = ' + obj[objs[i]];
    }
    catch (e) {
      opt.innerText = objs[i] + ' = [' + e.description + ']';
    }
  }
}

function getElementsNS(slct, obj) {
  // We make use of the __proto__ attribute, supported by Moz and Opera 7
  var props = new Array();
  var methods = new Array();
  var indeterminate = new Array();

  // Get # proto levels of obj
  var protoLevels = 0;
  for (var p = obj; p; p = p.__proto__) {
    props[protoLevels] = new Array();
    methods[protoLevels] = new Array();
    indeterminate[protoLevels] = new Array();
    ++protoLevels;
  }

  for (var elem in obj) {
    // Get proto level of elem
    var protoLevel = -1;
    try {
      for (var p = obj; p && (elem in p); p = p.__proto__)
        ++protoLevel;
    }
    catch (e) {     // "in" operator throws when param to props() is a string
      protoLevel = 0;
    }

    // Put elem into appropriate category
    try {
      if ((typeof(obj[elem])) == 'function')
        methods[protoLevel].push(elem);
      else
        props[protoLevel].push(elem);
    }
    catch (e) {
      indeterminate[protoLevel].push(elem);
    }
  }

  for (var i=0; i<protoLevels; i++) {
    var qual = '';
/*
    if (i == 0)
      qual = 'User-defined ';
    else if (i == 1)
      qual = 'Native ';
*/
/*
    if (i == 1)
      qual = 'Native ';
    else
      qual = 'User-defined ';
*/
    addArrayNS(props[i], qual + 'Properties', slct, obj);
    addArrayNS(methods[i], qual + 'Methods', slct, obj);
    addArrayNS(indeterminate[i], qual + 'Indeterminate', slct, obj);
  }
}

function addArrayNS(arr, header, slct, obj) {
  if (arr.length > 0) {
    var newOpt = document.createElement('OPTION');
    newOpt.name = '(category)';
    newOpt.innerHTML = '-------------------- ' + header + ' --------------------';
    slct.appendChild(newOpt);
    arr = arr.sort();
    for (var i=0; i<arr.length; ++i) {
      newOpt = document.createElement('OPTION');
      try {
        newOpt.name = arr[i];
        if (arr[i] == 'innerHTML')
          newOpt.innerHTML = 'innerHTML = [Not shown]';
        else {
          var tn;
          if (obj[arr[i]].toString().indexOf('function ') == 1) {
            var fv = obj[arr[i]].toString();
            fv = fv.substring(0, fv.indexOf('{') + 1) + ' [...] }';
            tn = document.createTextNode(arr[i] + ' = ' + fv);
          }
          else
            tn = document.createTextNode(arr[i] + ' = ' + obj[arr[i]]);
          newOpt.appendChild(tn);
        }
      }
      catch (e) {
        newOpt.innerHTML = arr[i] + ' = [' + e + ']';
      }
      slct.appendChild(newOpt);
    }
  }
}

function selectProp(slct) {
  if (slct.selectedIndex == -1)
    return;
  if (slct[slct.selectedIndex].name == '(category)')
    return;
  lvls.push(slct[slct.selectedIndex].name);
  showProps();
}

function goUp() {
  if (lvls.length > 1) {
    lvls.length--;
    showProps();
  }
}

function goBack() {
  if (exprHistoryIndex > 0) {
    exprHistoryIndex--;
    document.forms[0].elements['txtExpr'].value = exprHistory[exprHistoryIndex];
    getProps(true);
  }
}

function goForward() {
  if (exprHistory.length > exprHistoryIndex - 1) {
    exprHistoryIndex++;
    document.forms[0].elements['txtExpr'].value = exprHistory[exprHistoryIndex];
    getProps(true);
  }
}

function showProps() {
  var s = '';
  for (var i=0; i<lvls.length; i++) {
    if (!isNaN(lvls[i]))
      s += '['+lvls[i]+']';
    else {
      if (s != '')
        s += '.';
      s += lvls[i];
    }
  }
  document.forms[0].elements['txtExpr'].value = s;
  getProps();
}

function browseTo(expr) {
  document.forms[0].elements['txtExpr'].value = expr;
  document.forms[0].elements['btnGet'].click();
}
