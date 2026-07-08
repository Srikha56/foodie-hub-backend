const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading db.json" });
    }

    const jsonData = JSON.parse(data);

    const { number } = req.query;

    if (number) {
      const filtered = jsonData.restaurants.filter(
        (restaurant) => restaurant.number === number
      );
      return res.json(filtered);
    }

    res.json(jsonData.restaurants);
  });
});
app.post("/restaurants", (req, res) => {
  console.log("POST HIT");

  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    const jsonData = JSON.parse(data);

    jsonData.restaurants.push(req.body);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), () => {
      res.json({ message: "OK" });
    });
  });
});
  
app.get("/customers", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading db.json" });
    }

    const jsonData = JSON.parse(data);

    const { email } = req.query;

    if (email) {
      const filteredUsers = jsonData.customers.filter(
        (customer) => customer.email === email
      );
      return res.json(filteredUsers);
    }

    res.json(jsonData.customers);
  });
});
app.post("/customers", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading db.json" });
    }

    const jsonData = JSON.parse(data);

    const newCustomer = req.body;

    jsonData.customers.push(newCustomer);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving data" });
      }

      res.json({ message: "Signup successful", customer: newCustomer });
    });
  });
});
app.get("/foods", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading db.json" });
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData.foods);
  });
});
app.post("/foods", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading db.json" });
    }

    const jsonData = JSON.parse(data);

    jsonData.foods.push(req.body);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving food" });
      }

      res.json({ message: "Food added successfully" });
    });
  });
});

app.put("/foods/:id", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading db.json" });
    }

    const jsonData = JSON.parse(data);

    const foodIndex = jsonData.foods.findIndex(
      (food) => food.id === req.params.id
    );

    if (foodIndex === -1) {
      return res.status(404).json({ message: "Food not found" });
    }

    jsonData.foods[foodIndex] = req.body;

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating food" });
      }

      res.json({ message: "Food updated successfully" });
    });
  });
});
app.get("/orders", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading db.json" });
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData.orders);
  });
});
app.post("/orders", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    const jsonData = JSON.parse(data);

    jsonData.orders.push(req.body);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), () => {
      res.json({ message: "Order saved" });
    });
  });
});
app.put("/orders/:id", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading db.json" });
    }

    const jsonData = JSON.parse(data);

    const orderIndex = jsonData.orders.findIndex(
      (order) => order.id === req.params.id
    );

    if (orderIndex === -1) {
      return res.status(404).json({ message: "Order not found" });
    }

    jsonData.orders[orderIndex] = req.body;

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating order" });
      }

      res.json({ message: "Order updated successfully" });
    });
  });
});
app.get("/restaurantsdata", (req, res) => {
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading db.json" });
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData.restaurantsdata);
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});