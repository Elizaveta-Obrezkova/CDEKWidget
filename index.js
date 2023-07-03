let departureAddress = 'Москва';
let packageSize = [{
    length: 25,
    width: 17,
    height: 7,
    weight: 6,
}];


var widjet = new ISDEKWidjet({
    defaultCity: 'auto',
    detailAddress: true,
    goods: packageSize,
    cityFrom: departureAddress,
    onChooseAddress: onChooseAddress,
    link: 'forpvz',
    path: 'https://widget.cdek.ru/widget/scripts/',
    servicepath: 'https://widget.cdek.ru/widget/scripts/service.php' //ссылка на файл service.php на вашем сайте
});

widjet.binders.add(choosePVZ, 'onChoose');

let infoDelivery = [];

function choosePVZ(wat) {
    document.querySelector('.popup__info_type_address').textContent = `${wat.cityName}, ${wat.PVZ.Address}`;
    document.querySelector('.popup__info_type_workTime').textContent = `${wat.PVZ.WorkTime}`;
    document.querySelector('.popup__info_type_timeDelivery').textContent = `${wat.term} дня`;
    document.querySelector('.popup__info_type_priceDelivery').textContent = `${wat.price} ${wat.currency}`;
    popup.open();
    infoDelivery = wat;
}

function onChooseAddress(wat) {
    document.querySelector('.popup__info_type_address').textContent = `${wat.cityName}, ${wat.address}`;
    document.querySelector('.popup__info_type_workTime').textContent = `-`;
    document.querySelector('.popup__info_type_timeDelivery').textContent = `${wat.term} дня`;
    document.querySelector('.popup__info_type_priceDelivery').textContent = `${wat.price} ${wat.currency}`;
    popup.open();
    infoDelivery = wat;
}


class Popup {
    constructor (popupSelector, submit) {
        this._submit = submit;
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closePopupOverlay = this._closePopupOverlay.bind(this);
        this._form = this._popup.querySelector('.popup__form');
    }

    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._closePopupOverlay);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._closePopupOverlay);
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closePopupOverlay(evt) {
        if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__container')) {
            this.close();
        }
    }

    setEventListeners(evt) {
        this._buttonClose.addEventListener('click', () => {
            this.close();
            console.log(`Заявка ${infoDelivery.id} не оформлена`);
        })
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
        });
    }

}

function checkout() {
    console.log(infoDelivery);
    popup.close();
    alert('Заявка ' + infoDelivery.id + " принята!");

}

const popup = new Popup('.popup', checkout);
popup.setEventListeners();