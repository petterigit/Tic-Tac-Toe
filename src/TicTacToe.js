/* MODEL
  Handles background functionality
*/
var TicModel = function TicModel() {
  this.marker = " - ";
  this.rows = 5;
  this.columns = 5;
  this.turn = 0;
  this.ticArray = [...Array(5)].map(e => Array(5).fill(null));
};

TicModel.prototype.updateArray = function updateArray(index) {
  let row = Math.floor(index / 5);
  //console.log("Row: " + row);
  let column = index % 5;
  //console.log("Column: " + column);
  this.ticArray[row][column] = this.marker;
  //console.log(this.ticArray);
};

TicModel.prototype.nextTurn = function nextTurn() {
  if (this.turn === 1) {
    this.marker = " X ";
    this.turn = 0;
  } else if (this.turn === 0) {
    this.marker = " O ";
    this.turn = 1;
  }
};

TicModel.prototype.checkWinCon = function checkWinCon() {
  let markerStringVert, markerStringHori, markerStringDiag;

  for (let i = 0; i < this.rows; i++) {
    markerStringVert = "";
    for (let j = 0; j < this.columns; j++) {
      markerStringVert = markerStringVert + this.ticArray[i][j];
    }
    if (markerStringVert === " X  X  X  X  X ") {
      alert("X voitti !11!1!!1");
      return true;
    } else if (markerStringVert === " O  O  O  O  O ") {
      alert("O voitti !1!1!!!!");
      return true;
    }
  }
  for (let j = 0; j < this.rows; j++) {
    markerStringHori = "";
    for (let i = 0; i < this.columns; i++) {
      markerStringHori = markerStringHori + this.ticArray[i][j];
    }
    if (markerStringHori === " X  X  X  X  X ") {
      alert("X voitti !11!1!!1");
      return true;
    } else if (markerStringHori === " O  O  O  O  O ") {
      alert("O voitti !1!1!!!!");
      return true;
    }
  }

  for (let i = 0; i < this.columns; i++) {
    markerStringDiag = "";
    for (let j = 0, k = i; k < this.columns; j++, k++) {
      markerStringDiag = markerStringDiag + this.ticArray[j][k];
      if (markerStringDiag === " X  X  X  X  X ") {
        alert("X voitti !11!1!!1");
        return true;
      } else if (markerStringDiag === " O  O  O  O  O ") {
        alert("O voitti !1!1!!!!");
        return true;
      }
    }
    for (let j = 0, k = i; k >= 0; j++, k--) {
      markerStringDiag = markerStringDiag + this.ticArray[j][k];
      if (markerStringDiag === " X  X  X  X  X ") {
        alert("X voitti !11!1!!1");
        return true;
      } else if (markerStringDiag === " O  O  O  O  O ") {
        alert("O voitti !1!1!!!!");
        return true;
      }
    }
  }
};

/* VIEW
  Displays the functionality of the program
*/
var TicView = function TicView(element) {
  this.element = element;
  this.elementType = "canvas";
  this.updateView = null;
  this.ticCellButtons = new Array(25);
  this.lastButtonIndex = 0;
  this.initListener = null;
};

TicView.prototype.initListener = function initListener() {
  //alert("Listening " + this.ticCellButtons.length + " ticCells");
};

TicView.prototype.render = function render(ticModel) {
  let modelRows = ticModel.rows;
  let modelColumns = ticModel.columns;
  let modelArray = ticModel.ticArray;
  let htmlString = "";
  let canvasHeight = 80,
    canvasWidth = 80;
  htmlString = htmlString + "<table>";

  for (let i = 0; i < modelRows; i++) {
    htmlString = htmlString + "<tr>";
    for (let j = 0; j < modelColumns; j++) {
      htmlString =
        htmlString +
        '<td><canvas width="' +
        canvasWidth +
        '" height="' +
        canvasHeight +
        '" style="border:1px solid #000000;">';
      /*if (modelArray[i][j] === null) {
        htmlString = htmlString + " - ";
      } else if (modelArray[i][j] === " X ") {
        htmlString = htmlString + " X ";
      } else if (modelArray[i][j] === " O ") {
        htmlString = htmlString + " O ";
      }
      */
      htmlString = htmlString + '"></canvas></td>';
    }
    htmlString = htmlString + "</tr>";
  }
  htmlString = htmlString + "</table>";

  this.element.innerHTML = htmlString;

  this.ticCellButtons = this.element.querySelectorAll(this.elementType);

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (modelArray[i][j] === null) {
        let thisCanvas = this.ticCellButtons[5 * i + j];
        let ctx = thisCanvas.getContext("2d");
        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText("-", canvasWidth / 2, canvasHeight / 2 + 15);
      } else if (modelArray[i][j] === " X ") {
        let thisCanvas = this.ticCellButtons[5 * i + j];
        let ctx = thisCanvas.getContext("2d");
        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText("X", canvasWidth / 2, canvasHeight / 2 + 15);
      } else if (modelArray[i][j] === " O ") {
        let thisCanvas = this.ticCellButtons[5 * i + j];
        let ctx = thisCanvas.getContext("2d");
        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText("O", canvasWidth / 2, canvasHeight / 2 + 15);
      }
    }
  }
};

/* CONTROLLER
   Handles interaction between model and view
*/

var TicController = function TicController(ticView, ticModel) {
  this.ticView = ticView;
  this.ticModel = ticModel;
  this.ticController = this;
};

TicController.prototype.initialize = function initialize() {
  this.ticView.updateView = this.updateView.bind(this);
  this.ticView.initListener = this.initListener.bind(this);
  this.ticView.render(this.ticModel);
  this.initListener();
  this.ticModel.nextTurn();
};

TicController.prototype.checkWinCon = function checkWinCon() {};

TicController.prototype.updateView = function updateView() {
  this.ticModel.nextTurn();
  //console.log("Woah: " + this.ticView.lastButtonIndex);
  this.ticModel.updateArray(this.ticView.lastButtonIndex);
  this.ticView.render(this.ticModel);
  if (this.ticModel.checkWinCon()) {
    alert("Starting a new game");
    this.ticModel.ticArray = [...Array(5)].map(e => Array(5).fill(null));
    this.ticView.render(this.ticModel);
  }
};

TicController.prototype.initListener = function initListener() {
  this.ticView.ticCellButtons = targetElement.querySelectorAll(
    this.ticView.elementType
  );
  document.addEventListener("click", function(event) {
    //console.log(controller.ticView.ticCellButtons.length);
    for (let i = 0; i < controller.ticView.ticCellButtons.length; i++) {
      //console.log("Round: " + i);
      /*console.log(
        event.target.innerHTML +
          " =?= " +
          controller.ticView.ticCellButtons[i].innerHTML
      ); */
      if (event.target.isSameNode(controller.ticView.ticCellButtons[i])) {
        controller.ticView.lastButtonIndex = i;
        console.log(i + " to be updated");
        controller.updateView();
        break;
      }
    }
  });
};
/* INITIALIZE
 */

/* Elements */
var targetElement = document.getElementById("board");

/* M V C */
var ticModel = new TicModel();
var ticView = new TicView(targetElement);
var controller = new TicController(ticView, ticModel);

/* EXECUTION
 */

controller.initialize();
