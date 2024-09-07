export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const loadJSON = async (url) => (await fetch(url)).json();
