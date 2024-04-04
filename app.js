
const API_URL = './data.json';
const navElement = document.querySelector('.nav_element');

async function fetchAPIData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}


//щоб на мобільній версії було вказано друге слово, замість двох в planet__content-menu
if (window.innerWidth <= 768) {
    const item = document.querySelector('.hidden-content')
    item.innerHTML = item.innerHTML.replace('Internal', '');
    
    // document.querySelectorAll('.hidden-content').forEach(function(item) {
    //     item.innerHTML = item.innerHTML.replace('Internal', '');
    // });
}


const contentMenu = [...document.querySelectorAll('.planet__content-item')];

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  menuBtn.classList.toggle('open');
  menu.classList.toggle('open');

  if (menuBtn.classList.contains('open')) {
    menuBtn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  } else {
    menuBtn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }
}

function displayOverviewInfo(planet) {

    const bg = document.querySelector('.planet__bg');
    // console.log(bg);

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="planet__content-info">
            <h2 class="planet__content-title">${planet.name}</h2>
            <p class="planet__content-text">${planet.overview.content}</p>
            <div class="planet__content-source">Source: <a href="${planet.overview.source}" target="_blank">Wikipedia </a></div>
        </div>
    `;
    bg.style.backgroundImage = `url(${planet.images.planet})`;



    // проходимось по всіх елементах списку і перевіряємо на який елемент натиснули та додаємо відповідну інфо 
    contentMenu.forEach((menu, i) => {
        const div = document.createElement('div');
        menu.addEventListener('click', (e) => {
            // console.log(`клік є на ${i + 1}`)
            // додаємо клас на натиснутий елемент і видаляємо клас на всіх інших елементах
            contentMenu.forEach((menuElement, index) => {
                if (i === index) {
                    menuElement.classList.add('active');
                } else {
                    menuElement.classList.remove('active');
                }
            })
            if (i === 0) {
                // console.log('click on first')
                document.querySelector('#planet__info').innerHTML = '';
                div.innerHTML = `
                <div class="planet__content-info">
                    <h2 class="planet__content-title">${planet.name}</h2>
                    <p class="planet__content-text">${planet.overview.content}</p>
                    <div class="planet__content-source">Source: <a href="${planet.overview.source}" target="_blank">Wikipedia </a></div>
                </div>
                `;
                document.querySelector('#planet__info').prepend(div);
                bg.style.backgroundImage = `url(${planet.images.planet})`;
            } else if (i === 1) {
                // console.log('click on second')
                document.querySelector('#planet__info').innerHTML = '';
                div.innerHTML = `
                <div class="planet__content-info">
                    <h2 class="planet__content-title">${planet.name}</h2>
                    <p class="planet__content-text">${planet.structure.content}</p>
                    <div class="planet__content-source">Source: <a href="${planet.structure.source}" target="_blank">Wikipedia </a></div>
                </div>
                `;
                document.querySelector('#planet__info').prepend(div);
                bg.style.backgroundImage = `url(${planet.images.internal})`;
            } else if (i === 2) {
                // console.log('click on third')
                document.querySelector('#planet__info').innerHTML = '';
                div.innerHTML = `
                <div class="planet__content-info">
                    <h2 class="planet__content-title">${planet.name}</h2>
                    <p class="planet__content-text">${planet.geology.content}</p>
                    <div class="planet__content-source">Source: <a href="${planet.geology.source}" target="_blank">Wikipedia </a></div>
                </div>
                `;
                document.querySelector('#planet__info').prepend(div);
                bg.style.backgroundImage = `url(${planet.images.geology})`;
            }
            
        })
    })
    

    document.querySelector('#planet__info').innerHTML = '';
    document.querySelector('#planet__info').prepend(div);
}

//інформація про планету внизу строрінки
async function displayNumberInfo(planet) {
    const rotation = document.querySelector('#rotation');
    rotation.innerHTML = `
        <p class="footer_item-info">${planet.rotation}</p>
    `;

    const revolution = document.querySelector('#revolution');
    revolution.innerHTML = `
        <p class="footer_item-info">${planet.revolution}</p>
    `;

    const radius = document.querySelector('#radius');
    radius.innerHTML = `
        <p class="footer_item-info">${planet.radius}</p>
    `;

    const temp = document.querySelector('#temp');
    temp.innerHTML = `
        <p class="footer_item-info">${planet.temperature}</p>
    `;

}

async function init() {
    const data = await fetchAPIData();

    //для кнопок в навігації в десктопі
    const navItems = document.querySelectorAll('.nav_element li');
   
    // Додаємо подію кліку на кожен елемент меню
    navItems.forEach((navItem, index) => {
        navItem.addEventListener('click', () => {

            // Отримуємо дані про планету, яку вибрав користувач
            const selectedPlanet = data[index];

            // Відображаємо інформацію про вибрану планету
            displayOverviewInfo(selectedPlanet);
            displayNumberInfo(selectedPlanet);

            contentMenu.forEach(menuElement => {
                menuElement.classList.remove('active');
            });
                
            contentMenu[0].classList.add('active');
        });
    });

    // Початковий вибір першої планети
    navItems[0].click();

    //для кнопок в навігації в мобільній версії
    const menuItems = document.querySelectorAll('.menu-items li');
   
    // Додаємо подію кліку на кожен елемент меню
    menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener('click', () => {

            // Отримуємо дані про планету, яку вибрав користувач
            const selectedPlanet = data[index];

            // Відображаємо інформацію про вибрану планету
            displayOverviewInfo(selectedPlanet);
            displayNumberInfo(selectedPlanet);

            contentMenu.forEach(menuElement => {
                menuElement.classList.remove('active');
            });
                
            contentMenu[0].classList.add('active');
            toggleMenu();
        });
    });

    // Початковий вибір першої планети
    menuItems[0].click();
}

document.addEventListener('DOMContentLoaded', init);