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

TicModel.prototype.nextTurn = function nextTurn() {
  if (this.turn === 1) {
    this.marker = " X ";
    this.turn = 0;
  } else if (this.turn === 0) {
    this.marker = " O ";
    this.turn = 1;
  }
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

  let htmlString = "";
  htmlString = htmlString + "<table>";
  for (let i = 0; i < modelRows; i++) {
    htmlString = htmlString + "<tr>";
    for (let j = 0; j < modelColumns; j++) {
      htmlString = htmlString + '<td><button id="ticCell">';
      htmlString = htmlString + modelMarker;
      htmlString = htmlString + "</button></td>";
    }
    htmlString = htmlString + "</tr>";
  }
  htmlString = htmlString + "</table>";
  this.element.innerHTML = htmlString;

  let ticCellButtons = this.element.querySelectorAll("#ticCell");

  for (let i = 0; i < ticCellButtons.length; i++) {
    ticCellButtons[i].addEventListener("click", this.updateView);
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

TicController.prototype.updateView = function updateView() {
  this.ticView.render(this.ticModel);
  this.ticModel.nextTurn();
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
