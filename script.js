const popUp = selector => {
    const elems = document.querySelectorAll(selector);
    if (!elems) return;

    const show = content => {
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('popup');
        const popupModal = document.createElement('div');
        popupModal.classList.add('popup__modal');
        const popupClose = document.createElement('div');
        popupClose.classList.add('popup__close');
        popupClose.innerHTML = '&#215;';
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup__content');

        popupContent.append(content);
        popupContainer.addEventListener('click', e => {
            let target = e.target;
            if (target.classList.contains('popup') || target.classList.contains('popup__close')) {
                popupContainer.remove();
            }
        });

        popupContainer.append(popupModal);
        popupModal.append(popupClose, popupContent);
        document.body.append(popupContainer);
    }

    const popUpHandler = event => {
        event.preventDefault();
        let elem = event.target;
        let type = elem.dataset.type;

        if (!type) {
            let parent = elem.closest('[data-type]');
            if (!parent) return;
            type = parent.dataset.type;
            if (!type) return;
            elem = parent;
        }

        console.log(elem);
        console.log(type);

        let content = '';

        if (type === 'img') {
            const href = elem.href;
            if (!href) return;

            let img = document.createElement('img');
            img.setAttribute('src', href);
            content = img;
        }

        if (type === 'text') {
            let text = elem.dataset.content;
            content = text;
        }

        if (type === 'content') {
            let id = elem.dataset.id;
            if (!id) return;

            let idChild = document.getElementById(id).children[0];
            if (!idChild) return;

            content = idChild.cloneNode(true);
        }

        show(content);
    }

    elems.forEach(elem => elem.addEventListener('click', popUpHandler));
}

popUp('a');