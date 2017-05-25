'use strict';

var mPhrase = "";
var mTitle = "";

var PAGE_PROPORTION = 1.3;
var pageHeight = 680;

var MAX_FONT_SIZE = 500;
var ACCENT_CORRECTION = 0.18;

var BORDER_WIDTH = 18;
var borderPadding = BORDER_WIDTH;
var textPadding = borderPadding + 0.5*BORDER_WIDTH;

var mFont;
var textArea;
var textCanvas, tempTextcanvas, backgroundCanvas;

var hasTitle;

function preload() {
  mFont = loadFont("/js/MyFont-Bold.otf");
}

function saveLambe() {
  var fname = document.getElementById("lambeTexto").value;
  fname = fname.trim().replace(/ +/g, '').substring(0,8);
  saveCanvas(fname, "jpg");
}

function setup() {
  var dW = document.body.offsetWidth;
  var dH = document.body.offsetHeight;

  var formHeight = document.getElementById("inputsContainer").offsetHeight;

  var canvasW = Math.min(dW, PAGE_PROPORTION * (dH-formHeight));
  var canvasH = canvasW / PAGE_PROPORTION;

  document.getElementById("myCanvas").style.width = canvasW + "px";
  document.getElementById("myCanvas").style.height = canvasH + "px";
  document.getElementById("lambeTexto").style.width = (canvasW-20) + "px";
  document.getElementById("lambeTitulo").style.width = (canvasW-20) + "px";

  var myCanvas = createCanvas(canvasW, canvasH);
  myCanvas.parent('myCanvas');
  smooth();

  textArea = createVector(width-2*textPadding, height-2*textPadding);
  textCanvas = createGraphics(width, int(3*height));
  tempTextcanvas = createGraphics(textCanvas.width, textCanvas.height);
  backgroundCanvas = createGraphics(width, height);

  textFont(mFont);

  drawFrame(backgroundCanvas);
  drawSubtitle(backgroundCanvas, mTitle);
  drawText(textCanvas, breakText(mPhrase, 4));
}

function draw() {
  background(255);
  var cPhrase = document.getElementById("lambeTexto").value;
  var cTitle = document.getElementById("lambeTitulo").value;

  hasTitle = (cTitle.length > 0);

  if((cPhrase != mPhrase) || (cTitle != mTitle)){
    mPhrase = cPhrase;
    mTitle = cTitle;
    backgroundCanvas.clear();
    drawFrame(backgroundCanvas);
    drawSubtitle(backgroundCanvas, mTitle);
    drawText(textCanvas, breakText(mPhrase, 4));
  }

  image(textCanvas, 0, 0);
  image(backgroundCanvas, 0, 0);
}

function breakText(line, numLines) {
  line = line.trim();
  line = line.replace(/ +/g, ' ');
  var spaceCount = (line.match(/ /g) || []).length;


  if(spaceCount < numLines) {
    line = line.replace(/ /g, '\n');
  } else if(spaceCount < numLines+1) {
    line = breakStringIntoLines(line, numLines-1);
  } else {
    line = breakStringIntoLines(line, numLines);
  }
  return line;
}

function breakStringIntoLines(str, numLines) {
  var spaceIndexes = getCharIndexes(str, ' ');
  var desiredSplits = [];
  var currentSplits = [];

  for(var i=1; i<numLines; i++) {
    desiredSplits.push(i/numLines * str.length);
    currentSplits.push(spaceIndexes[0]);
  }

  for(var i=0; i<spaceIndexes.length; i++) {
    for(var j=0; j<desiredSplits.length; j++) {
      var newDistance = Math.abs(spaceIndexes[i] - desiredSplits[j]);
      var currentDistance = Math.abs(currentSplits[j] - desiredSplits[j]);
      currentSplits[j] = (newDistance < currentDistance)?spaceIndexes[i]:currentSplits[j];
    }
  }

  for(var j=0; j<currentSplits.length; j++) {
    str = replaceAt(str, currentSplits[j], '\n');
  }
  return str;
}

function getCharIndexes(str, char) {
  var indexes = str.split('').reduce(function(acc, el, ind) {
    return (el == char)?acc.concat(ind):acc;
  }, []);
  return indexes;
}

function replaceAt(str, ind, char) {
  return str.substr(0, ind) + char + str.substr(ind+char.length);
}

function drawText(canvas, line) {
  var mTextSize = MAX_FONT_SIZE;

  tempTextcanvas.smooth();
  tempTextcanvas.background(255);
  tempTextcanvas.textFont(mFont);
  tempTextcanvas.textAlign(LEFT, TOP);

  var words = line.split("\n");
  var yPos = textPadding;
  for(var i=0; i<words.length; i++) {
    var leftPos = textPadding;
    words[i] = words[i].toUpperCase();

    mTextSize = MAX_FONT_SIZE;
    textSize(mTextSize);
    while(textWidth(words[i]) > width-2*textPadding-8) {
      mTextSize -= 2;
      textSize(mTextSize);
    }

    if(textWidth(words[i]) < width-3*textPadding) {
      leftPos = (width-3*textPadding-textWidth(words[i]))/2;
    }

    tempTextcanvas.fill(0);
    tempTextcanvas.textSize(mTextSize);
    tempTextcanvas.text(words[i], leftPos, yPos+ACCENT_CORRECTION*mTextSize);

    yPos += mTextSize;
  }
  yPos += textPadding;

  var heightScaleRatio = (6.0 * height / 7.0) / yPos;
  if(!hasTitle) {
    heightScaleRatio = (6.9 * height / 7.0) / yPos;
  }

  canvas.smooth();
  canvas.background(0,0);
  canvas.push();
  canvas.scale(1, heightScaleRatio);
  canvas.image(tempTextcanvas, 0, 0);
  canvas.pop();
}

function drawFrame(canvas) {
  var RECT_POS = createVector(width/2, height/2);
  var RECT_SIZE = createVector(width-2*borderPadding, height-2*borderPadding);

  canvas.smooth();
  canvas.noFill();
  canvas.stroke(0);
  canvas.rectMode(CENTER);
  canvas.strokeWeight(BORDER_WIDTH);

  canvas.rect(RECT_POS.x, RECT_POS.y, RECT_SIZE.x, RECT_SIZE.y);
}

function drawSubtitle(canvas, subtitle) {
  var RECT_POS = createVector(width/2, textPadding+6.5*textArea.y/7.0);
  var RECT_SIZE = createVector(width-2*textPadding-8, textArea.y/7.0-8);
  var mTextSize = RECT_SIZE.y;

  subtitle = subtitle.trim();
  subtitle = subtitle.replace(/ +/g, ' ');
  subtitle = subtitle.toUpperCase();

  canvas.smooth();
  canvas.fill(0);
  canvas.noStroke();
  canvas.rectMode(CENTER);
  canvas.textFont(mFont);
  canvas.textAlign(CENTER, CENTER);

  textSize(mTextSize);
  while (textWidth(subtitle) > RECT_SIZE.x-16) {
    mTextSize -= 2;
    textSize(mTextSize);
  }
  canvas.textSize(mTextSize);
  var heightScaleRatio = RECT_SIZE.y/mTextSize;

  if(hasTitle) {
    canvas.push();
    canvas.translate(RECT_POS.x, RECT_POS.y);
    canvas.rect(0, 0, RECT_SIZE.x, RECT_SIZE.y);
    canvas.fill(255);
    canvas.push();
    canvas.scale(1,heightScaleRatio);
    canvas.text(subtitle, 0, 0);
    canvas.pop();
    canvas.pop();
  }
}
