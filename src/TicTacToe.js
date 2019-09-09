/* MODEL
  Handles background functionality
*/
var TicModel = function TicModel() {
  this.marker = " - ";
  this.rows = 5;
  this.columns = 5;
  this.turn = 1;
  this.ticArray = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ];
};

TicModel.prototype.updateArray = function updateArray(index) {
  let row = Math.floor(index / 5);
  let column = index % 5;
  this.ticArray[row][column] = this.marker;
};

TicModel.prototype.nextTurn = function nextTurn() {
  if (this.turn === 1) {
    this.marker = " X ";
    this.turn = 0;
  } else if (this.turn === 0) {
    this.marker = " O ";
    this.turn = 1;
  }
  //alert("next turn marker: " + this.marker);
};

/* VIEW
  Displays the functionality of the program
*/
var TicView = function TicView(element) {
  this.element = element;
  this.updateView = null;
};

TicView.prototype.render = function render(ticModel) {
  let modelRows = ticModel.rows;
  let modelColumns = ticModel.columns;
  let modelMarker = ticModel.marker;
  let modelArray = ticModel.ticArray;
  let htmlString = "";
  htmlString = htmlString + "<table>";
  for (let i = 0; i < modelRows; i++) {
    htmlString = htmlString + "<tr>";
    for (let j = 0; j < modelColumns; j++) {
      htmlString = htmlString + '<td><button id="ticCell">';
      if (modelArray[i][j] === null) {
        htmlString = htmlString + " - ";
      } else if (modelArray[i][j] === 1) {
        htmlString = htmlString + " X ";
      } else if (modelArray[i][j] === 0) {
        htmlString = htmlString + " O ";
      }
      htmlString = htmlString + "</button></td>";
    }
    htmlString = htmlString + "</tr>";
  }
  htmlString = htmlString + "</table>";

  this.element.innerHTML = htmlString;

  let ticCellButtons = this.element.querySelectorAll("#ticCell");
  for (var i = 0; i < ticCellButtons.length; i++) {
    ticCellButtons[i].addEventListener("click", function() {
      this.updateView(i);
    });
  }
};

/* CONTROLLER
   Handles interaction between model and view
*/

var TicController = function TicController(ticView, ticModel) {
  this.ticView = ticView;
  this.ticModel = ticModel;
};

TicController.prototype.initialize = function initialize() {
  this.ticView.updateView = this.updateView.bind(this);
  this.ticView.render(this.ticModel);
  this.ticModel.nextTurn();
};

TicController.prototype.updateView = function updateView(index) {
  alert("asd");
  this.ticModel.nextTurn();
  this.ticModel.updateArray(index);
  this.ticView.render(this.ticModel);
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
//controller.ticView.updateView(7);
