/*---------------------------------------------------------
Parse a text of Javascript source code.
Put each logical substring element into a tree structure
of BlockElement objects.

A BlockElement object has a start string and an end string.
It may also have a number of child blocks (contained in an array).
The child blocks together represent the substring between the parent's 
start string and end string.

Example - result of parsing:
while(i<3){       block 0 start string
  i++;            block 0 child 0 start string (and empty end string)
  j--;            block 0 child 1 start string (and empty end string)
  if(i==3){       block 0 child 2 start string
    j=0;          block 0 child 2 child 0 start string (and empty end string)
  }               block 0 child 2 end string
}                 block 0 end string

The source string is parsed 1 char. at a time.
Special handling is done for string expressions.
Validation is performed of opening and closing parantheses ( ) and brackets { }.

Copyright (c) Troels Jakobsen, bmkl@gmx.net
---------------------------------------------------------*/


// Define constants
var BLOCK_GENERIC    = 0;
var BLOCK_IF         = 1;
var BLOCK_FOR        = 2;
var BLOCK_WHILE      = 3;
var BLOCK_WITH       = 4;
var BLOCK_SWITCH     = 5;
var BLOCK_ELSE_SPACE = 6;

// Global vars.
var rootBlock;                    // Root BlockElement object
var parseErrors = new Array();    // Array of error (ParseError) elements
var prevIfBlock = null;           // The latest block containing an if statement
var isInsideVoidFunction = false; // Used when bookmarklet contains "(function(){...})()"

// Define parse error object
function ParseError(str, pos) {
  this.length = 2;
  this.str = str;
  this.pos = pos;
}

// Define block element object
function BlockElement(parent) {
  this.length = 8;
                                  // The complete statement might be:  while(i<3){i++;j--;}
  this.strStart = "";             // Start of statement if any         - eg. while(i<3){
  this.strEnd = "";               // End of statement if any           - eg. }
  this.type = BLOCK_GENERIC;      // Type of block (for, if, etc)
  this.level = 0;                 // Current level (number of consecutive parents)
  this.pos = -1;                  // Start pos. of str inside parent block's str
  this.indented = false;          // Indicates whether stmt. is indented in rel. to parent.
  this.parent = parent;           // Super-block
  this.children = new Array();    // Sub-blocks

  if (this.parent != null) {
    parent.children[parent.children.length] = this;
    this.level = parent.level+1;
  }
}

function addParseError(str, pos) {
  parseErr = new ParseError(str, pos);
  parseErrors[parseErrors.length] = parseErr;
}

function scan(str) {
  parseErrors.length = 0;
  return doScan(str);
}

function doScan(str) {

  function isNextStatementChild(block, str, strpos) {
    if (block.type != BLOCK_GENERIC) {
      // Check if statement ends with { or ;
      var cc = nextSignificantChar(str, strpos+1);
      if (cc != '{' && cc != ';') {
        // We have a condtional/loop statement (for/if/while/etc.) without brackets.
        // Next stmt. (and ONLY next stmt.) must be treated as a "child" (indented).
        return true;
      }
    }
    return false;
  }

  function insertChildBlock(block) {
    block = new BlockElement(block);
    return block;
  }

  function insertSiblingBlock(block) {
    block = new BlockElement(block.parent);
    return block;
  }

  function nonIndentedParent(block) {
    var parentBlock = block;
    while (parentBlock.indented) {
      if (parentBlock.parent == null) {
        return parentBlock;
      }
      parentBlock = parentBlock.parent;
    }
    return parentBlock;
  }

  var c;                     // Current char
  var strpos = -1;           // Position within str
  var substr = "";           // Current substring (since last substring)
  var block = null;          // Current BlockElement
  var parseErr;

  block = new BlockElement(null);
  block.level = -1;
  rootBlock = block;
  block = new BlockElement(block);

  while (strpos < str.length) {
    strpos++;
    c = str.charAt(strpos);
    switch (c) {

      default:
        substr += c;
        block.strStart = substr;
        break;

      case '"':              // String begin, read to end of string
      case '\'':
        var pos = endOfStringIndex(str, c, strpos, false);
        if (pos != -1) {
          substr += str.substring(strpos, pos+1);
          strpos = pos;
          block.strStart = substr;
        }
        else {
          return false;
        }
        break;

      case ';':              // End of statement, except in for statements
        substr += c;
/*
        if (block.type == BLOCK_FOR) {
          // We are inside a for statement, read to char before ending parenthesis
          var pos = matchingParenthesisIndex(str, "(", ")", strpos-substr.length);
          if (pos == -1) {
            addParseError("Expression is missing closing parenthesis )", strpos-substr.length);
            return false;
          }
          else {
            substr += str.substring(strpos+1, pos);
            strpos = pos-1;
            block.strStart = substr;
          }
        }
        else {
*/
          if (getStatementType(substr) != BLOCK_IF)
            if (block.parent != null && block.parent.type != BLOCK_IF)
              prevIfBlock = null;

          // End of statement
          block.strStart = substr;
          if (nextSignificantChar(str, strpos+1) == '/') {
            // Seems we have a comment following this statement
          }
          else {
            substr = "";

            if (block.indented) {
              var nipb = nonIndentedParent(block);
              if (nipb != null) {
                block = insertSiblingBlock(nipb);
              }
              else {
                block = insertSiblingBlock(block);
              }
            }
            else {
              block = insertSiblingBlock(block);
            }
          }
/*
        }
*/
        break;

      case '\n':             // End of statement (we presume)
/*
        block.strStart = substr;
        substr = "";
*/
/*
        block = insertSiblingBlock(block);
*/
/*
        if (prevSignificantChar(str, strpos-1) != ';') {
alert('no ;');
          block = insertSiblingBlock(block);
        }
*/
        break;

      case '\r':             // CR
        break;

      case '(':
        substr += c;
        block.strStart = substr;
        // Find type of statement (for/if/while/etc.)
        block.type = getStatementType(substr);

        if (block.type == BLOCK_IF)
          prevIfBlock = block;
        else
          prevIfBlock = null;

        // Check for "(function(){...})();"
        if (str.substring(strpos).indexOf("(function()") == 0) {
          // Found the start part
          substr = "(function()";
          strpos = strpos + substr.length - 1;
          block.strStart = substr;
          isInsideVoidFunction = true;
        }
        else {

          // Read to matching closing parenthesis
          var pos = matchingParenthesisIndex(str, "(", ")", strpos-1);
          if (pos == -1) {
            addParseError("Expression is missing closing parenthesis )", strpos);
            return false;
          }
          else {
            substr += str.substring(strpos+1, pos+1);
            strpos = pos;
            block.strStart = substr;
          }
          if (isNextStatementChild(block, str, strpos)) {
            substr = "";
            block = new BlockElement(block);
            block.indented = true;
          }

        }
        break;

      case ')':              // We only get here if there is not a corresponding start paranthesis
        // Check for "(function(){...})()"
        if (str.substring(strpos).replace(/[ \n\r]/g, "").indexOf(")()") == 0) {
          // Found the end part
          substr = ")()";
          strpos += str.substring(strpos+1).indexOf(")") + 1;
          strpos += str.substring(strpos+1).indexOf(")") + 1;
          block.strStart = substr;
          isInsideVoidFunction = false;
        }
        else {
          addParseError("Closing parenthesis ) without opening parenthesis (", strpos);
          return false;
        }
        break;

      case '{':
        substr += c;
        block.strStart = substr;
        block = insertChildBlock(block);
//alert(substr);
/*
        // Check for valid syntax
        if (block.type == BLOCK_GENERIC) {
          addParseError("Expression cannot use brackets", strpos);
          return false;
        }
*/
        // Check for matching closing bracket
        if (matchingParenthesisIndex(str, "{", "}", strpos-substr.length) == -1) {
          addParseError("Expression is missing closing bracket }", strpos);
          return false;
        }
        substr = "";
        break;

      case '}':
        if (prevSignificantChar(str, strpos-1) != ';') {
          if (block.indented) {
            var nipb = nonIndentedParent(block);
            if (nipb != null) {
              // Last stmt. was indented and NOT terminated with a ;
              // Hack! Why does this work?
              block = insertSiblingBlock(nipb);
            }
          }
        }

        block = block.parent;
        if (block != null) {
          block.strEnd = c;
          // Check for matching opening bracket
          if (block.strStart.indexOf('{') == -1) {
            addParseError("Closing bracket } without opening bracket {", strpos);
            return false;
            break;
          }
          var nipb = nonIndentedParent(block);
          if (nipb != null)
            block = insertSiblingBlock(nipb);
          else
            block = insertSiblingBlock(block);

        }
        substr = "";
        break;

      case ':':
        substr += c;
        // Check for "javascript:"
        if (trimLeadingSpaces(substr) == "javascript:") {
          block.strStart = substr;
          substr = "";
          block = insertSiblingBlock(block);
        }
        break;

      case 'e':
        substr += c;
        // Check for "else" without "{"
        if (trimLeadingSpaces(substr) == "else") {
          if (nextSignificantChar(str, strpos+1) != '{') {
            var cc = str.charAt(strpos+1);
            if (cc == ' ' || cc == '\r' || cc == '\n' || cc == '\t') {

              if (prevIfBlock == null) {
                if (block.parent != null && block.parent.children.length > 1) {
                  var prevSibling = block.parent.children[block.parent.children.length-2];
//alert(prevSibling.strStart);
                  if (prevSibling.type != BLOCK_IF) {
                    // We don't have an IF statement to match the ELSE
                    addParseError("ELSE without IF", strpos);
                    return false;
                    break;
                  }
                  else {
                    prevIfBlock = prevSibling;
                  }
                }
              }

              // Discard allocated block; we need to change its parent
              block.parent.children.length--;
              block = null;
              block = insertSiblingBlock(prevIfBlock);
              block.indented = prevIfBlock.indented;
              prevIfBlock = null;

              block.strStart = substr;
              substr = "";
              block.type = BLOCK_ELSE_SPACE;
              if (isNextStatementChild(block, str, strpos)) {
                substr = "";
                block = new BlockElement(block);
                block.indented = true;
              }
            }
          }
        }
        break;

      case '\\':
        // We need to read an extra char
        substr += c;
        strpos++;
        substr += getChar(str, strpos);
        block.strStart = substr;
        break;

      case '/':              // Check for regular string expressions and comments
        var cc = prevSignificantChar(str, strpos);
        // Check for regular string expression, eg.  /hello{2}/i
        // Reg. strings must end with / . A / inside a set, eg. [abc+-/*] doesn't count.
        if (cc == '(' || cc == '=') {            // We have a regular string expression
          var pos = endOfStringIndex(str, c, strpos, true);
          if (pos != -1) {
            substr += str.substring(strpos, pos+1);
            strpos = pos;
            block.strStart = substr;
          }
          else {
            return false;
          }
        }
//        else if (str.charAt(strpos-1) == '/') {  // We have a single-line comment  //
        else if (str.charAt(strpos-1) == '/' && nextSignificantChar(str, strpos+1) != '*') {  // We have a single-line comment  //
          // Remove the comment
          var pos = endOfLineIndex(str, strpos);
          if (pos != -1) {
//            substr += str.substring(strpos, pos+1);
            strpos = pos-1;
//            block.strStart = substr;
//            block.strStart = str.substring(0, str.length-2);
            substr = substr.substring(0, substr.length-1) + '\n';
            block.strStart = "";
          }
          else {
            return false;
          }
        }
        else {
          substr += c;
          block.strStart = substr;
        }
        break;

      case '*':
        if (str.charAt(strpos-1) == '/') {       // We have a multi-line comment  /*---*/
          var pos = str.indexOf('*/', strpos);
          if (pos != -1) {
            substr += str.substring(strpos, pos+2) + '\n';
            strpos = pos+1;
            block.strStart = substr;
          }
          else {
            return false;
          }
        }
        else {
          substr += c;
          block.strStart = substr;
        }
        break;

    }
  }
  return true;
}

function matchingParenthesisIndex(str, startChar, endChar, startPos) {
  // Find position of matching parenthesis or -1 if not found. Ignore strings.
  // Starting parenthesis (startChar) must be part of str starting at startPos.
  var c;
  var strpos = startPos;
  var subParLvl = 0;

  while (strpos < str.length) {
    strpos++;
    c = str.charAt(strpos);
    switch (c) {

      default:
        if (c == startChar) {
          subParLvl++;
        }
        else if (c == endChar) {
          subParLvl--;
          if (subParLvl == 0) {
            if (isInsideVoidFunction && startChar == '(') {
              // Compensate for "(function(){...})()"
              if (str.substring(strpos).replace(/[ \n\r]/g, "").indexOf(")()") == 0)
                return -1;
              else
                return strpos;
            }
            else
              return strpos;
            }
          }
        break;

      case '"':              // String begin, read to end of string
      case '\'':
        var pos = endOfStringIndex(str, c, strpos, false);
        if (pos != -1) {
          strpos = pos;
        }
        else {
          return -1;
        }
        break;

      case '/':              // Check for regular string expressions and comments
        var cc = prevSignificantChar(str, strpos);
        // Check for regular string expression, eg.  /hello{2}/i
        if (cc == '(' || cc == '=') {            // We have a regular string expression
          var pos = endOfStringIndex(str, c, strpos, true);
          if (pos != -1) {
            strpos = pos;
          }
          else {
            return -1;
          }
          break;
        }
        else if (str.charAt(strpos-1) == '/') {  // We have a single-line comment  //
          var pos = endOfLineIndex(str, strpos);
          if (pos != -1) {
            strpos = pos;
          }
          else {
            return -1;
          }
        }
        else {
          // goto default
        }
        break;

      case '*':
        if (str.charAt(strpos-1) == '/') {       // We have a multi-line comment  /*---*/
          var pos = str.indexOf('*/', strpos);
          if (pos != -1) {
            strpos = pos+1;
          }
          else {
            return -1;
          }
        }
        else {
          // goto default
        }
        break;

    }
  }
  return -1;
}

function endOfStringIndex(str, chr, startPos, regStrExpr) {
  // Read to end of string and return end of string pos., or -1 if error
  var c;
  var strpos = startPos;

  while (strpos < str.length) {
    strpos++;
    c = str.charAt(strpos);
    switch (c) {

      default:
        if (c == chr) {
          return strpos;
        }
        break;

      case '\r':
      case '\n':
        // Line break; seems we have an unterminated string
        addParseError("Unterminated string", startPos);
        return -1;
        break;

      case '\\':
        // We need to read an extra char in case it's \' or \"
        strpos++;
        break;

      case '[':
        if (regStrExpr) {
//          strpos = matchingParenthesisIndex(str, '[', ']', strpos);
          var pos = endOfStringIndex(str, ']', strpos, true);
          if (pos != -1) {
            strpos = pos;
          }
          else {
            // Seems we have an unterminated regular expression
            addParseError("Unterminated regular expression - missing ]", startPos);
            return -1;
          }
        }
        break;

    }
  }

  // Seems we have an unterminated string
  addParseError("Unterminated string", startPos);
  return -1;
}

function endOfLineIndex(str, startPos) {
  // Read to end of line and return end of line pos., or -1 if error
  var c;
  var strpos = startPos;

  while (strpos < str.length) {
    strpos++;
    c = str.charAt(strpos);
    switch (c) {

      default:
        if (c == '\n') {
          return strpos;
        }
        break;

      case '\\':
        // We need to read an extra char in case it's \' or \"
        strpos++;
        break;

    }
  }

  // Seems we have an unterminated string
  addParseError("Unterminated comment(?)", startPos);
  return -1;
}

function getStatementType(str) {
  if (findSubstatement(str, "if"))
    return BLOCK_IF;
  if (findSubstatement(str, "for"))
    return BLOCK_FOR;
  if (findSubstatement(str, "while"))
    return BLOCK_WHILE;
  if (findSubstatement(str, "with"))
    return BLOCK_WITH;
  if (findSubstatement(str, "switch"))
    return BLOCK_SWITCH;
  return BLOCK_GENERIC;
}

function findSubstatement(str, substr) {
  var stmt = str.toLowerCase();
  stmt = trimLeadingSpaces(stmt);
  substr = substr.toLowerCase();

  if (stmt.indexOf(substr) == 0) {
    if (nextSignificantChar(stmt, substr.length) == '(')
      return true;
  }
  return false;
}

function getChar(str, strpos) {
  // Get char at strpos but check for invalid string positions
  var s = str.charAt(0);
  if (s != undefined)
    return s;
  return '';
}

function nextSignificantChar(str, strpos) {
  // Get next char from strpos, ignoring spaces
  var s = str.substring(strpos);
  s = trimLeadingSpaces(s);
  if (s.length > 0)
    return s.charAt(0);
  return '';
}

function prevSignificantChar(str, strpos) {
  // Get previous char from strpos, ignoring spaces
  var s = str.substring(0, strpos);
  while ((s.length > 0) && (s.charAt(s.length-1) == ' ')) {
    s = s.substring(0, s.length-1);
  }
  if (s.length > 0)
    return s.charAt(s.length-1);
  return '';
}
