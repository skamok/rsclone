/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
export function startMap() {
  ymaps.ready(init);
}

function init() {
  // eslint-disable-next-line no-unused-vars
  const suggestView = new ymaps.SuggestView('suggest');
  let map;
  let placemark;
  // При клике по кнопке запускаем верификацию введёных данных.
  const inputMap = document.querySelector('.input_map');
  // eslint-disable-next-line no-use-before-define
  // eslint-disable-next-line no-unused-expressions
  inputMap.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      geocode();
    }
  });
  inputMap.addEventListener('blur', () => { geocode(); });
  if (inputMap.value.length !== 0) {
    geocode();
  }

  function geocode() {
    // Забираем запрос из поля ввода.
    const request = document.querySelector('#suggest').value;
    // Геокодируем введённые данные.
    ymaps.geocode(request).then((res) => {
      const obj = res.geoObjects.get(0);
      let error;
      let hint;

      if (obj) {
        switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
          case 'exact':
            break;
          case 'number':
          case 'near':
          case 'range':
            error = 'Inaccurate address, clarification required';
            hint = 'Specify house number';
            break;
          case 'street':
            error = 'Incomplete address, clarification required';
            hint = 'Specify house number';
            break;
          case 'other':
          default:
            error = 'Inaccurate address, clarification required';
            hint = 'Specify the address';
        }
      } else {
        error = 'Address not found';
        // eslint-disable-next-line no-unused-vars
        hint = 'Specify the address';
      }
      if (error) {
        showError(error);
      } else {
        showResult(obj);
      }
    }, (e) => {
      // eslint-disable-next-line no-console
      console.log(e);
    });
  }
  function showResult(obj) {
    const notice = document.querySelector('#notice');
    notice.style.display = 'none';
    const shortAddress = obj.properties._data.name;
    const mapState = {
      center: obj.geometry._coordinates,
      controls: [],
      zoom: 14
    };
    createMap(mapState, shortAddress);
  }

  function showError(message) {
    const mapContainer = document.querySelector('#map');
    mapContainer.style.display = 'none';
    const suggest = document.querySelector('#suggest');
    suggest.classList.add('input_error');
    const notice = document.querySelector('#notice');
    notice.classList.add('message_err');
    notice.innerText = message;
    notice.style.display = 'block';
    // Удаляем карту.
    if (map) {
      map.destroy();
      map = null;
    }
  }

  function createMap(state, caption) {
    const mapContainer = document.querySelector('#map');
    mapContainer.style.display = 'block';
    if (!map) {
      map = new ymaps.Map('map', state);
      placemark = new ymaps.Placemark(
        state.center, {
          iconCaption: caption,
          balloonContent: caption
        }, {
          preset: 'islands#redDotIconWithCaption'
        }
      );
      map.geoObjects.add(placemark);
    } else {
      map.setCenter(state.center, state.zoom);
      placemark.geometry.setCoordinates(state.center);
      placemark.properties.set({ iconCaption: caption, balloonContent: caption });
    }
    return (state, caption);
  }
}

export function mapPopap(addressLot) {
  ymaps.ready(createMapPopap);
  function createMapPopap() {
    ymaps.geocode(addressLot).then((res) => {
      const obj = res.geoObjects.get(0);
      const caption = obj.properties._data.name;
      const state = {
        center: obj.geometry._coordinates,
        controls: [],
        zoom: 14
      };
      const mapContainer = document.querySelector('#map_popap');
      const map = new ymaps.Map(mapContainer, state);
      const placemark = new ymaps.Placemark(
        state.center, {
          iconCaption: caption,
          balloonContent: caption
        }, {
          preset: 'islands#redDotIconWithCaption'
        }
      );
      map.geoObjects.add(placemark);
    });
  }
}
