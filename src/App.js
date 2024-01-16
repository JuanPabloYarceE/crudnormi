import React, { Component } from "react";

class CRUDApp extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };
  }

  handleInput = (e) => {
    const text = e.target.value;
    const key = Date.now();
    this.setState({
      currentItem: {
        text,
        key,
      },
    });
  };

  addItem = (e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  };

  deleteItem = (key) => {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItems,
    });
  };

  editItem = (key) => {
    const selectedItem = this.state.items.find((item) => item.key === key);
    this.setState({
      currentItem: {
        text: selectedItem.text,
        key: selectedItem.key,
      },
    });
    this.deleteItem(key);
  };

  render() {
    return (
      <div>
        <h1>CRUD App</h1>
        <form onSubmit={this.addItem}>
          <input
            type="text"
            placeholder="Ingrese un elemento"
            value={this.state.currentItem.text}
            onChange={this.handleInput}
          />
          <button type="submit">Agregar</button>
        </form>
        <ul>
          {this.state.items.map((item) => (
            <li key={item.key}>
              {item.text}
              <button onClick={() => this.editItem(item.key)}>Editar</button>
              <button onClick={() => this.deleteItem(item.key)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CRUDApp;
