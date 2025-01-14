export default {
  required: "Это обязательное поле!",
  email: "Введите верную почту!",
  minPassword(number: number) {
    return `Длина пароля должна быть от ${number} символов`;
  },
  minLength(number: number) {
    return `Длина должна быть от ${number} символов`;
  },
  maxLength(number: number) {
    return `Длина должна быть не более ${number} символов`;
  },
};
