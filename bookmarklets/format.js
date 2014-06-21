/*---------------------------------------------------------
Present a formatted string of source code.
This is done by traversing the tree structure that was built by the
parser (parse.js).

The main advantage of having put the parse result into the tree
structure is that we can separate the formatting logic from the
parsing logic. This makes the parsing easier, and it's also practical
if we want to customize the formatting later or present more than
one format.

The result is presented with indentations and line breaks.

Copyright (c) Troels Jakobsen, bmkl@gmx.net
---------------------------------------------------------*/



function getFormattedText() {
  var s = doGetFormattedText(rootBlock);
  s = s.replace(/\t/g, indent(1));
  return s;
}

function doGetFormattedText(block) {
  // Get formatted text with indentations and line breaks
  var s = "";
  if (block.strStart != "")
    if (trimLeadingSpacesAndTabs(block.strStart) != "")
      s = indent(block.level) + trimLeadingSpacesAndTabs(block.strStart) + "\r\n";
//if (block.indented) s = "XXXXX" + s;
//        s = indent(block.level) + getFormattedBlockStatement(block.strStart) + "\n";
  for (var i=0; i<=block.children.length-1; i++) {
    s += doGetFormattedText(block.children[i]);
  }
  if (block.strEnd != "")
//    if (trimLeadingSpacesAndTabs(block.strEnd) != "")
      s += indent(block.level) + block.strEnd + "\r\n";
  return s;
}

function getCompressedText() {
  var s = doGetCompressedText(rootBlock);
  s = s.replace(/\t/g, "");
  s = replaceOutsideStrings(s, " ", "")
  s = s.replace(/else \{/g, "else{");
  s = s.replace(/void \(/g, "void(");
  return s;
}

function doGetCompressedText(block) {
  // Essentially the same as doGetFormattedText but without indentations and line breaks
  var s = "";

  if (block.type == BLOCK_ELSE_SPACE) {
    // "else" statements that should have a trailing space have been truncated. We compensate for this.
    block.strStart += " ";
  }

  if (block.strStart != "")
    if (trimLeadingSpacesAndTabs(block.strStart) != "")
      s = trimLeadingSpacesAndTabs(block.strStart) + "\r\n";
  for (var i=0; i<=block.children.length-1; i++) {
    s += doGetCompressedText(block.children[i]);
  }
  if (block.strEnd != "")
//    if (trimLeadingSpacesAndTabs(block.strEnd) != "")
      s += block.strEnd + "\r\n";
  return s;
}

/*
function getFormattedBlockStatement(str) {

  function formattedStatement(str, stmtstart) {
    var s = str.replace(stmtstart, stmtstart.replace("(", " ("));
    return s;
  }

  s = "for(";
  if (str.indexOf(s) == 0)
    return formattedStatement(str, s);

  s = "if(";
  if (str.indexOf(s) == 0)
    return formattedStatement(str, s);

  s = "while(";
  if (str.indexOf(s) == 0)
    return formattedStatement(str, s);

  s = "with(";
  if (str.indexOf(s) == 0)
    return formattedStatement(str, s);

  return str;
}
*/

function indent(lvl) {
  var INDENTLEVEL = 2;
  var s = "";
  for (var i=0; i<lvl*INDENTLEVEL; i++)
    s += " ";
  return s;
}

function trimLeadingSpaces(str) {
  // Remove leading spaces from str
  var s = str;
  while (s.match(/^ /))
    s = s.replace(/^ /, '');
  return s;
}

function trimLeadingSpacesAndTabs(str) {
  // Remove leading spaces and tabs from str
  var s = trimLeadingSpaces(str);
  while (s.match(/^\t/))  {
    s = s.replace(/^\t/, '');
    s = trimLeadingSpaces(s);
  }
  return s;
}

function getErrorText(str) {
  var s = "";
  if (parseErrors.length > 0) {
//    s += "Parse error:\n";
    var pe = parseErrors[0];
    s += "Pos. " + pe.pos + ": " + pe.str;

    s += "\n \n" + str.substring(0, pe.pos+1);
    s += "  <---";
  }
  return s;
}

function replaceOutsideStrings(str, searchStr, replaceStr) {
  // Replace searchStr with replaceStr globally, except inside strings
  // and after reserved words (eg. var x=3).
  var c;
  var strpos = -1;
  var lastpos = 0;
  var outstr = "";

  function reservedWordFound() {
    var reserved = new Array( "var ", "new ", "function ", "return ", "throw ", "typeof ", "do ", "else ", "void ", " in " );
    for (var i=0; i<reserved.length; i++) {
      if (str.substring(strpos).indexOf(reserved[i]) == 0) {
        // Reserved word found; skip to end of that word
        strpos += reserved[i].length-1;
        outstr += reserved[i];
        return true;
      }
    }
    return false;
  }

  while (strpos < str.length) {
    strpos++;
    c = str.charAt(strpos);
    switch (c) {

      default:
        if (reservedWordFound()) {
          // The reservedWordFound method skips the reserved word
        }
        else if (c == searchStr.charAt(0)) {
          if (str.substring(strpos).indexOf(searchStr) == 0) {
            // Search string found; replace and skip to end of search string
            strpos += searchStr.length-1;
            outstr += replaceStr;
          }
          else
            outstr += c;               // No change
        }
        else
          outstr += c;                 // No change
        break;

      case '"':              // String begin, read to end of string
      case '\'':
        var pos = endOfStringIndex(str, c, strpos);
        if (pos != -1) {
          // Add unmodified string
          outstr += str.substring(strpos, pos+1);
          strpos = pos;
        }
        else {
          return "";
        }
        break;

      case '\\':
        // We need to read an extra char in case it's \' or \"
        outstr += c;
        strpos++;
        outstr += str.charAt(strpos);
        break;

      case '/':              // Check for regular string expressions and comments
        var cc = prevSignificantChar(str, strpos);
        // Check for regular string expression, eg.  /hello{2}/i
        // Reg. strings must end with / . A / inside a set, eg. [abc+-/*] doesn't count.
        if (cc == '(' || cc == '=') {                 // We have a regular string expression
          var pos = endOfStringIndex(str, c, strpos, true);
          if (pos != -1) {
            // Add unmodified string
            outstr += str.substring(strpos, pos+1);
            strpos = pos;
          }
          else {
            return "";
          }
        }
        else
          outstr += c;
        break;

      case '*':
        if (str.charAt(strpos-1) == '/') {       // We have a multi-line comment  /*---*/
          var pos = str.indexOf('*/', strpos);
          if (pos != -1) {
            outstr += str.substring(strpos, pos+2);
            strpos = pos+1;
          }
          else {
            return "";
          }
        }
        else {
          outstr += c;
        }
        break;

    }
  }

  return outstr;
}
