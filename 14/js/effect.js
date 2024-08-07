const EFFECT = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

//проходимся по эффектам и говорим, какой стиль будет применяться
const EFFECT_TO_FILTER = {
  [EFFECT.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [EFFECT.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [EFFECT.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [EFFECT.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [EFFECT.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

//определяем эффектам настройки: максимальное и минимальное значение и шаг
const EFFECT_TO_SLIDER_OPTIONS = {
  [EFFECT.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [EFFECT.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EFFECT.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EFFECT.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [EFFECT.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [EFFECT.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const imgUpload = document.querySelector('.img-upload');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const effects = imgUpload.querySelector('.effects');
const effectLevel = imgUpload.querySelector('.effect-level__value');
const slider = imgUpload.querySelector('.effect-level__slider');
const sliderContainer = imgUpload.querySelector('.img-upload__effect-level');

let chosenEffect = EFFECT.DEFAULT;

const isDefault = () => chosenEffect === EFFECT.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imgUploadPreview.style.filter = null;
    return;
  }

  const { value } = effectLevel;
  const { style, unit } = EFFECT_TO_FILTER[chosenEffect];
  imgUploadPreview.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectLevel.value = slider.noUiSlider.get();//в значение элемента передает ему значение, которое он узнаёт из noUiSlider в настройках format(значение шагов). Эти значения он потом передаёт в эффект.
  setImageStyle();
};

//создаем слайдер с помощью библиотеки noUiSlider
const createSlider = ({ min, max, step }) => {
  noUiSlider.create(slider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });

  slider.noUiSlider.on('update', onSliderUpdate);//update - это передвижение ползунка слайдера, при передвижении вызывается функция onSliderUpdate
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(EFFECT_TO_SLIDER_OPTIONS[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

//при закрытие обнуляет эффекты
const reset = () => {
  setEffect(EFFECT.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(EFFECT_TO_SLIDER_OPTIONS[chosenEffect]);
  effects.addEventListener('change', onEffectsChange);
};

export { init, reset };
