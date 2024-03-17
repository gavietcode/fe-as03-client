// Check emty
export const isEmpty = (value) => value.trim() === "";

// Hàm check password có ít nhất 9 ký tự
export const correctPassword = (value) => value.trim().length > 8;

// Check eemail
export const checkEmail = (value, useArr) =>
  useArr.filter((item) => item.email === value);

export const checkPassword = (value, useArr) =>
  useArr.filter((item) => item.password === value);
