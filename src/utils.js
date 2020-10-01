// Функция из интернета по генерации случайного числа из диапазона
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция для генерации даты.
export const generateDate = () => {
  const maxDaysGap = getRandomInteger(0, 365);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  let currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate = new Date(currentDate);

  return `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
};

// Функция получения случайного элемента из массива
export const getRandomElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};
