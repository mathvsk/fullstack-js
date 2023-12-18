export class ElementsHTML {
  constructor() {
    this.tbody = document.querySelector('tbody');
    this.addForm = document.querySelector('.add-form');
  } 

  appendChild(target) {
    this.tbody.appendChild(target);
  }
}