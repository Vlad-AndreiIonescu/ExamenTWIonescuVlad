const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const cors = require("cors");
const { query } = require("express");
const { DataTypes } = require("sequelize");
const handleSelectRecordsPaginated =
  require("./service").handleSelectRecordsPaginated;
const handleSelectRecordsSorted =
  require("./service").handleSelectRecordsSorted;
const handleSelectRecordsFiltered =
  require("./service").handleSelectRecordsFiltered;

//ne conectam la sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "examen.db",
  define: {
    timestamps: false,
  },
});

const VirtualShelf = sequelize.define("virtualShelfs", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  descriere: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [3, 3000] },
  },
  date: {
    type: DataTypes.DATE,
  },
});

const Book = sequelize.define("books", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  titlu: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [5, 30] },
  },
  gen: {
    type: DataTypes.ENUM("COMEDY", "TRAGEDY", "ACTION"),
  },
  url: {
    type: DataTypes.STRING,
    validate: { isUrl: true },
  },
});

VirtualShelf.hasMany(Book);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/virtualShelfs/paginate", async (request, response) => {
  const page = request.query.page;
  const pageSize = request.query.pageSize;

  try {
    await handleSelectRecordsPaginated(VirtualShelf, page, pageSize, response);
    response.status(200).send();
  } catch (err) {
    console.log(err);
    response.status(400).json({
      message: "Bad request",
    });
  }
});

app.get("/virtualShelfs/sort", async (request, response) => {
  const { field, direction } = request.query;
  if (!field || !direction || (direction != "ASC" && direction != "DESC")) {
    return response.status(400).json({
      message: "Bad request",
    });
  }

  try {
    await handleSelectRecordsSorted(VirtualShelf, field, direction, response);
    response.status(200).send();
  } catch (err) {
    console.log(err);
    response.status(400).json({
      message: "Bad request",
    });
  }
});

app.get("/virtualShelfs/filter", async (request, response) => {
  const fields = request.query;
  console.log(fields);
  try {
    await handleSelectRecordsFiltered(VirtualShelf, fields, response);
    response.status(200).send();
  } catch (err) {
    console.log(err);
    response.status(400).json({
      message: "Bad request",
    });
  }
});

app.get("/sync", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "tables created" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.get("/virtualShelfs", async (req, res) => {
  const { simplified, sortBy } = req.query;
  try {
    const virtualShelf = await VirtualShelf.findAll({
      attributes: simplified ? { exclude: "id" } : undefined,
      order: sortBy ? [[sortBy], "ASC"] : undefined,
    });
    res.status(200).json(virtualShelf);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});
app.post("/virtualShelfs", async (req, res) => {
  try {
    await VirtualShelf.create(req.body);
    res.status(201).json({ message: "created" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.get("/virtualShelfs/:vsid", async (req, res) => {
  try {
    const virtualShelf = await VirtualShelf.findByPk(req.params.vsid, {
      include: Book,
    });
    if (virtualShelf) {
      res.status(200).json(virtualShelf);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});
app.put("/virtualShelfs/:vsid", async (req, res) => {
  try {
    const virtualShelf = await VirtualShelf.findByPk(req.params.vsid);
    if (virtualShelf) {
      await virtualShelf.update(req.body, {
        fields: ["id", "descriere", "date"],
      });
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});
app.delete("/virtualShelfs/:vsid", async (req, res) => {
  try {
    const virtualShelf = await VirtualShelf.findByPk(req.params.vsid, {
      include: Book,
    });
    if (virtualShelf) {
      await virtualShelf.destroy();
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.get("/virtualShelfs/:vsid/books", async (req, res) => {
  try {
    const virtualShelf = await VirtualShelf.findByPk(req.params.vsid);
    if (virtualShelf) {
      const book = await virtualShelf.getBooks();
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.post("/virtualShelfs/:vsid/books", async (req, res) => {
  try {
    const virtualShelf = await VirtualShelf.findByPk(req.params.vsid);
    if (virtualShelf) {
      const book = req.body;
      book.virtualShelfId = virtualShelf.id;
      await Book.create(book);
      res.status(201).json({ message: "created" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.get("/virtualShelfs/:vsid/books/:bid", async (req, res) => {
  try {
    const virtualShelf = await VirtualShelf.findByPk(req.params.vsid);
    if (virtualShelf) {
      const books = await virtualShelf.getBooks({
        where: { id: req.params.bid },
      });
      const book = books.shift();
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } else {
      res.status(404).json({ message: "VirtualShelf not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.put("/virtualShelfs/:vsid/books/:bid", async (req, res) => {
  try {
    const virtualShelf = await VirtualShelf.findByPk(req.params.vsid);
    if (virtualShelf) {
      const books = await virtualShelf.getBooks({
        where: { id: req.params.bid },
      });
      const book = books.shift();
      if (book) {
        await book.update(req.body);
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } else {
      res.status(404).json({ message: "VirtualShelf not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});
app.delete("/virtualShelfs/:vsid/books/:bid", async (req, res) => {
  try {
    const virtualShelf = await VirtualShelf.findByPk(req.params.vsid);
    if (virtualShelf) {
      const books = await virtualShelf.getBooks({
        where: { id: req.params.bid },
      });
      const book = books.shift();
      if (book) {
        await book.destroy();
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } else {
      res.status(404).json({ message: "VirtualShelf not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.listen(8080);
