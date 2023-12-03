import { v4 as uuid } from 'uuid';

const createGhostElement = (GHOST_ELEMENT_ID: string) => {
  const ghostElement = document.createElement('div');
  ghostElement.id = GHOST_ELEMENT_ID;
  ghostElement.style.cssText =
    'display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;';
  document.body.appendChild(ghostElement);
  return ghostElement;
};

const characterEntities = {
  ' ': 'nbsp',
  '<': 'lt',
  '>': 'gt',
};
function mapSpecialCharacterToCharacterEntity(specialCharacter: string) {
  return (
    '&' +
    characterEntities[specialCharacter as keyof typeof characterEntities] +
    ';'
  );
}
function escapeSpecialCharacters(string: string) {
  return string.replace(/\s|<|>/g, mapSpecialCharacterToCharacterEntity);
}

export const autoResizeInput = (
  element: HTMLInputElement,
  options?: { minWidth: string }
) => {
  const GHOST_ELEMENT_ID = `${uuid()}__autosizeInputGhost`;

  const elementStyle = window.getComputedStyle(element);
  // prettier-ignore
  let elementCssText = 'box-sizing:' + elementStyle.boxSizing +
    ';border-left:' + elementStyle.borderLeftWidth + ' solid red' +
    ';border-right:' + elementStyle.borderRightWidth + ' solid red' +
    ';font-family:' + elementStyle.fontFamily +
    ';font-feature-settings:' + elementStyle.fontFeatureSettings +
    ';font-kerning:' + elementStyle.fontKerning +
    ';font-size:' + elementStyle.fontSize +
    ';font-stretch:' + elementStyle.fontStretch +
    ';font-style:' + elementStyle.fontStyle +
    ';font-variant:' + elementStyle.fontVariant +
    ';font-variant-caps:' + elementStyle.fontVariantCaps +
    ';font-variant-ligatures:' + elementStyle.fontVariantLigatures +
    ';font-variant-numeric:' + elementStyle.fontVariantNumeric +
    ';font-weight:' + elementStyle.fontWeight +
    ';letter-spacing:' + elementStyle.letterSpacing +
    ';margin-left:' + elementStyle.marginLeft +
    ';margin-right:' + elementStyle.marginRight +
    ';padding-left:' + elementStyle.paddingLeft +
    ';padding-right:' + elementStyle.paddingRight +
    ';text-indent:' + elementStyle.textIndent +
    ';text-transform:' + elementStyle.textTransform;

  if (options?.minWidth) {
    elementCssText += `;min-width:${options.minWidth};`;
  }

  function setWidth() {
    const string = element.value || element.getAttribute('placeholder') || '';
    // Check if the `ghostElement` exists. If no, create it.
    const ghostElement =
      document.getElementById(GHOST_ELEMENT_ID) ||
      createGhostElement(GHOST_ELEMENT_ID);
    // Copy all width-affecting styles to the `ghostElement`.
    ghostElement.style.cssText += elementCssText;
    ghostElement.innerHTML = escapeSpecialCharacters(string);
    // Copy the width of `ghostElement` to `element`.
    const width = window.getComputedStyle(ghostElement).width;
    element.style.width = width;
    return width;
  }

  element.addEventListener('input', setWidth);

  const width = setWidth();

  // Set `min-width` only if `options.minWidth` was set, and only if the initial
  // width is non-zero.
  if (options && options.minWidth && width !== '0px') {
    element.style.minWidth = width;
  }

  return function () {
    element.removeEventListener('input', setWidth);
    const ghostElement = document.getElementById(GHOST_ELEMENT_ID);
    if (ghostElement) {
      ghostElement?.parentNode?.removeChild(ghostElement);
    }
  };
};
