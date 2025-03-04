export const validatePassword = (password) => {
  const hasSpecial = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLetters = /[a-zA-Z]/.test(password);

  return hasLetters && hasNumber && hasSpecial && password.length >= 8;
};

export const generateRandomString = (length) => {
  let mask = "";
  mask += "abcdefghijklmnopqrstuvwxyz";
  mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  mask += "0123456789";
  mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
  let result = "";
  for (let i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
};
