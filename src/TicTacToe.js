import "./styles.css";
/* MODEL
  Handles background functionality
*/
class TicModel {
  constructor() {
    this.marker = "";
    this.rows = 5;
    this.columns = 5;
    this.turn = 0;
    this.ticArray = [...Array(5)].map(e => Array(5).fill(null));
  }
  updateArray(index) {
    let row = Math.floor(index / 5);
    let column = index % 5;
    this.ticArray[row][column] = this.marker;
  }
  nextTurn() {
    if (this.turn === 1) {
      this.marker = " X ";
      this.turn = 0;
    } else if (this.turn === 0) {
      this.marker = " O ";
      this.turn = 1;
    }
  }
  checkWinCon() {
    let markerStringVert, markerStringHori, markerStringDiag;

    for (let i = 0; i < this.rows; i++) {
      markerStringVert = "";
      for (let j = 0; j < this.columns; j++) {
        markerStringVert = markerStringVert + this.ticArray[i][j];
      }
      if (markerStringVert === " X  X  X  X  X ") {
        alert("Player 1 won!");
        console.log("win con 1");
        return true;
      } else if (markerStringVert === " O  O  O  O  O ") {
        console.log("win con 1");
        alert("Player 2 won!");
        return true;
      }
    }
    for (let j = 0; j < this.rows; j++) {
      markerStringHori = "";
      for (let i = 0; i < this.columns; i++) {
        markerStringHori = markerStringHori + this.ticArray[i][j];
      }
      if (markerStringHori === " X  X  X  X  X ") {
        console.log("win con 2");
        alert("Player 1 won!");
        return true;
      } else if (markerStringHori === " O  O  O  O  O ") {
        console.log("win con 2");
        alert("Player 2 won!");
        return true;
      }
    }
    for (let i = 0; i < this.columns; i++) {
      markerStringDiag = "";
      for (let j = 0, k = i; k < this.columns; j++, k++) {
        markerStringDiag = markerStringDiag + this.ticArray[j][k];
        if (markerStringDiag === " X  X  X  X  X ") {
          console.log("win con 3");
          alert("Player 1 won!");
          return true;
        } else if (markerStringDiag === " O  O  O  O  O ") {
          console.log("win con 3");
          alert("Player 2 won!");
          return true;
        }
      }
      markerStringDiag = "";
      for (let j = 0, k = i; k >= 0; j++, k--) {
        markerStringDiag = markerStringDiag + this.ticArray[j][k];
        if (markerStringDiag === " X  X  X  X  X ") {
          console.log("win con 3");
          alert("Player 1 won!");
          return true;
        } else if (markerStringDiag === " O  O  O  O  O ") {
          console.log("win con 3");
          alert("Player 2 won!");
          return true;
        }
      }
    }
  }
}

/* VIEW
  Displays the functionality of the program
*/
class TicView {
  constructor(boardElement, barElement) {
    this.boardElement = boardElement;
    this.progressElement = barElement;
    this.elementType = "td";
    this.updateView = null;
    this.ticCellButtons = new Array(25);
    this.lastButtonIndex = 0;
    this.initListener = null;

    this.barWidth = 1;
    this.barId = null;
    this.barInterval = null;
  }
  initListener() {
    //alert("Listening " + this.ticCellButtons.length + " ticCells");
  }
  render(ticModel, renderAll) {
    let modelRows = ticModel.rows;
    let modelColumns = ticModel.columns;
    let modelArray = ticModel.ticArray;
    let modelTurn = ticModel.turn;
    let htmlString = "";

    if (renderAll === undefined) {
      renderAll = true;
    }

    if (renderAll) {
      htmlString = htmlString + '<h1 id="headerElement"> Next in line: ';
      if (modelTurn === 1) {
        htmlString = htmlString + "x </h1>";
      } else if (modelTurn === 0) {
        htmlString = htmlString + "o </h1>";
      }
      htmlString = htmlString + "<table>";
      for (let i = 0; i < modelRows; i++) {
        htmlString = htmlString + "<tr>";
        for (let j = 0; j < modelColumns; j++) {
          htmlString = htmlString + "<td>";
          if (modelArray[i][j] === null) {
            htmlString = htmlString + "";
          } else if (modelArray[i][j] === " X ") {
            htmlString = htmlString + " x ";
          } else if (modelArray[i][j] === " O ") {
            htmlString = htmlString + " o ";
          }
          htmlString = htmlString + "</td>";
        }
        htmlString = htmlString + "</tr>";
      }
      htmlString = htmlString + "</table>";
      this.boardElement.innerHTML = htmlString;
    } else {
      let headerElement = document.getElementById("headerElement");
      htmlString = htmlString + '<h1 id="headerElement"> Next in line: ';
      if (modelTurn === 1) {
        htmlString = htmlString + "x </h1>";
      } else if (modelTurn === 0) {
        htmlString = htmlString + "o </h1>";
      }
      headerElement.innerHTML = htmlString;
    }
    this.ticCellButtons = this.boardElement.querySelectorAll(this.elementType);

    setTimeout(function() {
      controller.ticModel.checkWinCon();
    }, 30);
    //controller.ticModel.checkWinCon();
  }

  move() {
    clearInterval(this.barInterval);
    let elem = document.getElementById("progressBar");
    let width = 0;
    this.barInterval = setInterval(frame, 100);
    function frame() {
      if (width >= 100) {
        controller.updateView(false);
        return true;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = 10 - Math.floor(width / 10) + " Seconds remaining";
      }
    }
  }
}

/* CONTROLLER
   Handles interaction between model and view
*/
class TicController {
  constructor(ticView, ticModel) {
    this.ticView = ticView;
    this.ticModel = ticModel;
    this.ticController = this;
  }
  initialize() {
    this.ticView.updateView = this.updateView.bind(this);
    this.ticView.initListener = this.initListener.bind(this);
    this.ticModel.nextTurn();
    this.ticView.render(this.ticModel);
    this.initListener();
  }
  updateView(renderAll) {
    this.ticModel.nextTurn();
    if (renderAll !== false) {
      this.ticModel.updateArray(this.ticView.lastButtonIndex);
    }
    this.ticView.render(this.ticModel, renderAll);
    this.ticView.move();
    //this.ticModel.checkWinCon();
    //alert("Starting a new game");
    //this.ticModel.ticArray = [...Array(5)].map(e => Array(5).fill(null));
    //this.ticView.render(this.ticModel);
  }
  initListener() {
    this.ticView.ticCellButtons = this.ticView.boardElement.querySelectorAll(
      this.ticView.elementType
    );
    document.addEventListener("click", function(event) {
      for (let i = 0; i < controller.ticView.ticCellButtons.length; i++) {
        if (event.target.isSameNode(controller.ticView.ticCellButtons[i])) {
          if (controller.ticView.ticCellButtons[i].innerHTML === "") {
            controller.ticView.lastButtonIndex = i;
            //console.log(i + " to be updated");
            controller.updateView();
            break;
          }
          
        }
      }
    });
  }
}

/* Elements */
var boardElement = document.getElementById("board");
var barElement = document.getElementById("progressBar");

/* M V C */
var ticModel = new TicModel();
var ticView = new TicView(boardElement, barElement);
var controller = new TicController(ticView, ticModel);

/* EXECUTION
 */

controller.initialize();
