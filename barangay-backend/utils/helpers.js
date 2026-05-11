module.exports = {
  formatDate: (date) => {
    return new Date(date).toISOString().split("T")[0];
  },

  generateCode: () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  },
};