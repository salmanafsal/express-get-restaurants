const request = require('supertest');
const app = require('./src/app.js');

describe('Restaurants API', () => {

  let restaurantId;

  // Test GET /restaurants
  describe('GET /restaurants', () => {
    it('should return status code 200', async () => {
      const res = await request(app).get('/restaurants');
      expect(res.status).toBe(200); // Jest assertion
    });

    it('should return an array of restaurants', async () => {
      const res = await request(app).get('/restaurants');
      expect(res.body).toBeInstanceOf(Array); // Jest assertion
    });

    /*it('should return the correct number of restaurants', async () => {
      const res = await request(app).get('/restaurants');
      console.log("Response Body:", res.body); // Debugging line
      expect(res.body.length).toBe(23); // Adjust based on the actual number of restaurants in the DB
    });*/

    it('should return correct restaurant data', async () => {
      const res = await request(app).get('/restaurants');
      const restaurant = res.body[0]; // Assuming the first restaurant
      expect(restaurant).toHaveProperty('name'); // Jest assertion
      expect(restaurant).toHaveProperty('id'); // Jest assertion
      expect(restaurant).toHaveProperty('location'); // Jest assertion
    });
  });

  // Test GET /restaurants/:id
  describe('GET /restaurants/:id', () => {
    it('should return the correct restaurant data by id', async () => {
      const res = await request(app).get('/restaurants/6');
      expect(res.status).toBe(200); // Jest assertion
      expect(res.body).toHaveProperty('id', 6); // Check if the id is 6
      expect(res.body).toHaveProperty('name'); // Check if name exists
    });
  });

  // Test POST /restaurants
  describe('POST /restaurants', () => {
    it('should add a new restaurant and return updated array', async () => {
      const newRestaurant = {
        name: 'New Restaurant',
        location: 'New Location',
      };

      const res = await request(app)
        .post('/restaurants')
        .send(newRestaurant);

      expect(res.status).toBe(201); // Jest assertion
      expect(res.body).toHaveProperty('name', 'New Restaurant');
     /* expect(res.body.length).toBe(4); // Adjust based on the initial number of restaurants
      expect(res.body[res.body.length - 1]).toHaveProperty('name', 'New Restaurant'); // Check if new restaurant was added*/
    });
  });

  // Test PUT /restaurants/:id
  describe('PUT /restaurants/:id', () => {
    it('should update a restaurant with the provided values', async () => {
      const updatedRestaurant = {
        name: 'Updated Restaurant',
        location: 'Updated Location',
      };

      const res = await request(app)
        .put('/restaurants/6')
        .send(updatedRestaurant);

      expect(res.status).toBe(200); // Jest assertion
      expect(res.body).toHaveProperty('name', 'Updated Restaurant'); // Check if name is updated
      expect(res.body).toHaveProperty('location', 'Updated Location'); // Check if location is updated
    });
  });

  // Test DELETE /restaurants/:id
  describe('DELETE /restaurants/:id', () => {
    it('should delete a restaurant by id', async () => {
      const res = await request(app).delete('/restaurants/3');
      expect(res.status).toBe(204); // Jest assertion

      // Check that the restaurant array has one less item
      const getRes = await request(app).get('/restaurants');
      expect(getRes.body.length).toBe(5); // Adjust based on the number of restaurants
    });
  });

});
