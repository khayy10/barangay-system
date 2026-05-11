module.exports = {
  isEmpty: (value) => {
    return value === undefined || value === null || value === "";
  },

  isEmail: (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  },
};