import query from '../db/index.js';

class Model {
  constructor(name, id_name) {
    this.name = name;
    this.id_name = id_name;
  }

  async findById(id) {
    if (!id) {
      throw new Error('ID must be provided');
    } else {
      const blogPosts = await query(`SELECT 
  blogposts.blogpost_id, 
blogposts.category, 
blogposts.title, 
blogposts.content,
blogposts.cover, 
authors.author_id, 
authors.name, 
authors.surname FROM ${this.name} INNER JOIN authors ON blogposts.author = author_id
WHERE ${this.id_name} = ${id}
  `);
      if (blogPosts) {
        return blogPosts;
      } else {
        const error = new Error(`ID you're looking found is not there!`);
        error.code = 404;
        throw error;
      }
    }
  }

  async find(filter, projection) {
    let queryText = `SELECT ${projection ? projection : '*'} FROM ${this.name}`;
    if (Object.values(filter).length > 0) {
      const entries = Object.entries(filter);
      const whereConditions = entries
        .map(([key, value]) => `${key} = '${value}'`)
        .join(' AND ');
      queryText += `WHERE ${whereConditions}`;
    }
    console.log(queryText);
    const blogPosts = await query(queryText);
    return blogPosts;
  }

  async create(modelValues) {
    if (Object.values(modelValues).length > 0) {
      let queryText = `INSERT INTO ${this.name} (${Object.keys(
        modelValues
      ).join(',')}) VALUES(${Object.values(modelValues)
        .map((v) => `'${v}'`)
        .join(',')}) RETURNING *;`;
      const blogPosts = await query(queryText);
      return blogPosts;
    } else {
      const error = new Error('Values must be provided');
      error.code = 400;
      throw error;
    }
  }
  async update(id, toUpdate) {
    if (id && Object.values(toUpdate).length > 0) {
      let queryText = `UPDATE ${this.name} SET ${Object.entries(toUpdate)
        .map(([key, value]) => `${key}='${value}'`)
        .join(',')} WHERE ${this.id_name} = ${id} RETURNING *;`;
      console.log(queryText);
      const dbResponse = await query(queryText);
      return dbResponse;
    } else {
      const error = new Error('ID and update must be provided');
      error.code = 400;
      throw error;
    }
  }
  async deleteById(id) {
    if (id) {
      let queryText = `DELETE FROM ${this.name} WHERE ${this.id_name}=${id};`;
      const blogPosts = await query(queryText);
      return blogPosts;
    } else {
      const error = new Error('Id  must be provided');
      error.code = 400;
      throw error;
    }
  }
}

export default Model;
