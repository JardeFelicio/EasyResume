export default {
  isEmail: (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  },
  isPhone: (phone) => {
    if (!phone) {
      return false;
    }
    if (phone.length < 10) {
      return false;
    }
    const regex = /^[0-9]*$/;
    return regex.test(phone);
  },
};
