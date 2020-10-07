import Abstract from '../view/abstract';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, child, place = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const renderTemplate = (container, template, place = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const addChild = (parent, child) => {
  if (parent instanceof Abstract) {
    parent = parent.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (!parent || !child) {
    throw new Error(`Can't add child.`);
  }

  parent.appendChild(child);
};

export const deleteChild = (child) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }

  const parent = child.parentElement;

  if (!parent || !child) {
    throw new Error(`Can't remove child.`);
  }

  parent.removeChild(child);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
