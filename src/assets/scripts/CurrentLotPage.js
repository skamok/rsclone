import MessageFromPopup from './MessageFromPopup.js';
import NotificationBlock from './NotificationBlock.js';
import { mapPopap } from './inputMap.js';

export default class CurrentLotPage {
  constructor(lotInfo, header, main, firebase, isTaken, userData, winLots) {
    this.lotInfo = lotInfo;
    this.main = main;
    this.header = header;
    this.firebase = firebase;
    this.isTaken = isTaken;
    this.userData = userData;
    this.winLots = winLots;
  }

  createCurrentLotPage() {
    this.popUpContainer = document.createElement('div');
    this.popUpContainer.classList.add('popup_container');
    this.main.appendChild(this.popUpContainer);

    this.popUpWindow = document.createElement('div');
    this.popUpWindow.classList.add('popup_window');
    this.popUpContainer.appendChild(this.popUpWindow);

    this.mainLotInfoContainer = document.createElement('div');
    this.mainLotInfoContainer.classList.add('main_lot_info_container');
    this.popUpWindow.appendChild(this.mainLotInfoContainer);

    this.closeButton = document.createElement('img');
    this.closeButton.src = './assets/images/close.png';
    this.closeButton.classList.add('close_popup_button');
    this.mainLotInfoContainer.appendChild(this.closeButton);

    this.lotTitlePopup = document.createElement('div');
    this.lotTitlePopup.classList.add('lot_title_popup');
    this.lotTitlePopup.innerText = this.lotInfo.title;
    this.mainLotInfoContainer.appendChild(this.lotTitlePopup);

    this.lotPopupDescription = document.createElement('div');
    this.lotPopupDescription.classList.add('lot_popup_description');
    this.lotPopupDescription.innerText = this.lotInfo.description;
    this.mainLotInfoContainer.appendChild(this.lotPopupDescription);

    // Slider
    this.currentSlide = 0;

    this.sliderContainer = document.createElement('div');
    this.sliderContainer.classList.add('slider_container');
    this.mainLotInfoContainer.appendChild(this.sliderContainer);

    this.sliderControlLeft = document.createElement('img');
    this.sliderControlLeft.classList.add('slider_controls');
    this.sliderControlLeft.src = './assets/images/left-arrow.svg';
    this.sliderContainer.appendChild(this.sliderControlLeft);
    this.sliderControlLeft.addEventListener('click', () => {
      this.allImagesArray = document.querySelectorAll('.test_image');
      this.currentSlide -= 1;
      if (this.currentSlide < 0) {
        this.currentSlide += 1;
        return;
      }
      for (let i = 0; i < this.allImagesArray.length; i++) {
        this.allImagesArray[i].style.transform = `translateX(${(-100) * this.currentSlide}%)`;
      }
    });

    this.sliderImageContainer = document.createElement('div');
    this.sliderImageContainer.classList.add('slider_image_container');
    this.sliderContainer.appendChild(this.sliderImageContainer);

    for (let i = 1; i < this.lotInfo.imgURLs.length; i++) {
      this.testImage = document.createElement('img');
      this.testImage.src = `${this.lotInfo.imgURLs[i]}`;
      this.testImage.classList.add('test_image');
      this.sliderImageContainer.appendChild(this.testImage);
    }

    this.sliderControlRight = document.createElement('img');
    this.sliderControlRight.classList.add('slider_controls');
    this.sliderControlRight.src = './assets/images/right-arrow.svg';
    this.sliderContainer.appendChild(this.sliderControlRight);
    this.sliderControlRight.addEventListener('click', () => {
      this.allImagesArray = document.querySelectorAll('.test_image');
      this.currentSlide += 1;
      if (this.currentSlide >= this.lotInfo.imgURLs.length - 1) {
        this.currentSlide -= 1;
        return;
      }
      for (let i = 0; i < this.allImagesArray.length; i++) {
        this.allImagesArray[i].style.transform = `translateX(${(-100) * this.currentSlide}%)`;
      }
    });

    // actions

    this.popupActionsContainer = document.createElement('div');
    this.popupActionsContainer.classList.add('popup_actions_container');
    this.mainLotInfoContainer.appendChild(this.popupActionsContainer);

    if (!this.isTaken) {
      // take action
      this.popupTakeAction = document.createElement('div');
      this.popupTakeAction.classList.add('popup_action');
      this.popupActionsContainer.appendChild(this.popupTakeAction);

      this.popupTakeActionImage = document.createElement('img');
      this.popupTakeActionImage.src = './assets/images/take.png';
      this.popupTakeActionImage.classList.add('popup_action_image');
      this.popupTakeAction.appendChild(this.popupTakeActionImage);

      this.popupTakeActionText = document.createElement('div');
      this.popupTakeActionText.classList.add('popup_action_text');
      this.popupTakeActionText.innerText = 'Take';
      this.popupTakeAction.appendChild(this.popupTakeActionText);

      // message action

      this.popupMessageAction = document.createElement('div');
      this.popupMessageAction.classList.add('popup_action');
      this.popupActionsContainer.appendChild(this.popupMessageAction);

      this.popupMessageActionImage = document.createElement('img');
      this.popupMessageActionImage.src = './assets/images/messages.png';
      this.popupMessageActionImage.classList.add('popup_action_image');
      this.popupMessageAction.appendChild(this.popupMessageActionImage);

      this.popupMessageActionText = document.createElement('div');
      this.popupMessageActionText.classList.add('popup_action_text');
      this.popupMessageActionText.innerText = 'Message to owner';
      this.popupMessageAction.appendChild(this.popupMessageActionText);

      // to wishes action

      this.popupWishesAction = document.createElement('div');
      this.popupWishesAction.classList.add('popup_action');
      this.popupActionsContainer.appendChild(this.popupWishesAction);

      this.popupWishesActionImage = document.createElement('img');
      this.popupWishesActionImage.src = './assets/images/wishes.png';
      this.popupWishesActionImage.classList.add('popup_action_image');
      this.popupWishesAction.appendChild(this.popupWishesActionImage);

      this.popupWishesActionText = document.createElement('div');
      this.popupWishesActionText.classList.add('popup_action_text');
      this.popupWishesActionText.innerText = 'To wishes';
      this.popupWishesAction.appendChild(this.popupWishesActionText);

      // to see on map

      this.popupMapAction = document.createElement('div');
      this.popupMapAction.classList.add('popup_action');
      this.popupActionsContainer.appendChild(this.popupMapAction);

      this.popupMapActionImage = document.createElement('img');
      this.popupMapActionImage.src = './assets/images/map_icon.png';
      this.popupMapActionImage.classList.add('popup_action_image');
      this.popupMapAction.appendChild(this.popupMapActionImage);

      this.popupMapActionText = document.createElement('div');
      this.popupMapActionText.classList.add('popup_action_text');
      this.popupMapActionText.innerText = 'On map';

      this.popupMapAction.appendChild(this.popupMapActionText);

      this.popupWishesAction.addEventListener('click', this.toggleWishes);
      this.popupTakeAction.addEventListener('click', this.takeLot);
      this.popupMapAction.addEventListener('click', this.mapLot);
    } else {
      this.popupMessageAction = document.createElement('div');
      this.popupMessageAction.classList.add('popup_action');
      this.popupActionsContainer.appendChild(this.popupMessageAction);

      this.popupMessageActionImage = document.createElement('img');
      this.popupMessageActionImage.src = './assets/images/messages.png';
      this.popupMessageActionImage.classList.add('popup_action_image');
      this.popupMessageAction.appendChild(this.popupMessageActionImage);

      this.popupMessageActionText = document.createElement('div');
      this.popupMessageActionText.classList.add('popup_action_text');
      this.popupMessageActionText.innerText = 'Message to owner';
      this.popupMessageAction.appendChild(this.popupMessageActionText);
    }

    this.closeButton.addEventListener('click', () => {
      this.popUpContainer.parentNode.removeChild(this.popUpContainer);
    });

    this.popupMessageAction.addEventListener('click', this.writeMessage);
  }

  mapLot = (event) => {
    event.preventDefault();
    this.firebase.readUserByID(this.lotInfo.userID)
      .then((user) => {
        if (user.location !== undefined) {
          this.mapPopapContainer = document.createElement('div');
          this.mapPopapContainer.setAttribute('id', 'map_popap');
          this.popUpContainer.appendChild(this.mapPopapContainer);

          this.closePopupMapButton = document.createElement('img');
          this.closePopupMapButton.src = './assets/images/close.png';
          this.closePopupMapButton.classList.add('close_popup_map_button');
          this.mapPopapContainer.appendChild(this.closePopupMapButton);

          this.closePopupMapButton.addEventListener('click', () => { this.mapPopapContainer.remove(); });
          mapPopap(user.location);
        } else {
          const winNotification = new NotificationBlock(this.header, 'Lot location not specified', false);
          winNotification.showNotification();
        }
      });
  }

  takeLot = (event) => {
    event.preventDefault();
    this.firebase.readCurrentUser()
      .then((user) => {
        if ((user.userID !== this.lotInfo.userID) && (user.karmaCount >= this.lotInfo.price)) {
          return this.firebase.lotStateUpdate(this.lotInfo, 70, user);
        }
        throw new Error('error');
      })
      .then(() => {
        const winNotification = new NotificationBlock(this.header, 'You win! Connect to owner.', false);
        winNotification.showNotification();
      })
      .catch((e) => {
        const takeError = new NotificationBlock(this.header, e.message, true);
        takeError.showNotification();
      });
  }

  toggleWishes = (event) => {
    event.preventDefault();
    this.firebase.toggleWishLots(this.lotInfo)
      .then((message) => {
        let notificationMessage = '';
        if (message.includes('delete')) {
          notificationMessage = 'Lot deleted from wishlist';
        } else {
          notificationMessage = 'Lot added to wishlist';
        }
        const wishNotification = new NotificationBlock(this.header, notificationMessage, false);
        wishNotification.showNotification();
      })
      .catch((error) => {
        const wishError = new NotificationBlock(this.header, error, true);
        wishError.showNotification();
      });
  }

  writeMessage = (event) => {
    event.preventDefault();
    const message = new MessageFromPopup(this.header, this.main,
      this.popUpWindow, this.firebase, this.lotInfo, this.userData);
    message.createMessageWindow();
  }
}
