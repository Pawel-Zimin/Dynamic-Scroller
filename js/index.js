const wrapper = document.querySelector('.wrapper');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const circleContainer = document.querySelector('.indicator');
const articleContainer = document.querySelector('.main');

let circleIndex = 0;
let isThrottled = false;

let startTouchX;
let startTouchY;

const articles = [{
      imgSrc: 'img/girl-5535979_1920.jpg',
      text: 'article 1'
   },
   {
      imgSrc: 'img/smartphone-5231499_1920.jpg',
      text: 'article 2'
   },
   {
      imgSrc: 'img/work-5382501_1920.jpg',
      text: 'article 3'
   },
   {
      imgSrc: 'img/workplace-5517762_1920.jpg',
      text: 'article 4'
   },
   {
      imgSrc: '/img/sky-690293_1920.jpg',
      text: 'new sky image'
   }
];

const createArticles = (articles) => {
   for (let i = 0; i < articles.length; i++) {
      const circle = document.createElement('div');
      circle.classList.add('circle');
      circleContainer.appendChild(circle);

      const section = document.createElement('section');
      section.classList.add('main__section');
      articleContainer.appendChild(section);

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('section__img-container');
      section.appendChild(imageContainer);

      const articleImage = document.createElement('img');
      articleImage.classList.add('section__img', 'image--wide');
      articleImage.setAttribute('src', articles[i].imgSrc);
      imageContainer.appendChild(articleImage);

      const articleText = document.createElement('p');
      articleText.classList.add('main__section-text');
      articleText.textContent = articles[i].text;
      section.appendChild(articleText);
   }
}

const functionThrottling = () => {
   if (isThrottled) return;
   isThrottled = true;
   setTimeout(() => {
      isThrottled = false;
   }, 750);
}

const scrollToSection = () => {
   if (circleIndex === 0) {
      header.scrollIntoView({
         behavior: 'smooth'
      });
   } else if (circleIndex === circles.length - 1) {
      footer.scrollIntoView({
         behavior: 'smooth'
      });
   } else if (circleIndex === -1) {
      console.log('Invalid index value');
   } else {
      const currentSection = [...sections][circleIndex - 1];
      currentSection.scrollIntoView({
         behavior: 'smooth'
      });
   }
}

const modifyActiveCircle = () => {
   circles.forEach(circle => circle.classList.remove('active'));
   [...circles][circleIndex].classList.add('active');
}

const scrollOnWheelFunction = (event) => {
   event.preventDefault();
   functionThrottling();

   if (event.deltaY === 100 && circleIndex < [...circles].length - 1) {
      circleIndex++;
      modifyActiveCircle();
      scrollToSection();
   } else if (event.deltaY === -100 && circleIndex > 0) {
      circleIndex--;
      modifyActiveCircle();
      scrollToSection();
   }
}

const scrollOnKeydownFunction = (event) => {
   event.preventDefault();
   functionThrottling();

   switch (event.code) {
      case ('ArrowDown'):
         if (circleIndex < circles.length - 1) {
            circleIndex++;
            modifyActiveCircle();
            scrollToSection();
         }
         break;
      case ('ArrowUp'):
         if (circleIndex > 0) {
            circleIndex--;
            modifyActiveCircle();
            scrollToSection();
         }
         break;
   }
}

const scrollOnClickFunction = (event) => {
   circles.forEach(circle => circle.classList.remove('active'));
   event.target.classList.add('active');
   circleIndex = [...circles].findIndex(circle => circle.classList.contains('active'));

   scrollToSection();

   circles.forEach(circle => {
      circle.removeEventListener('click', scrollOnClickFunction);
      setTimeout(() => {
         circle.addEventListener('click', scrollOnClickFunction)
      }, 500);
   });
}

const touchstartFunction = (event) => {
   event.preventDefault();

   startTouchX = event.touches[0].clientX;
   startTouchY = event.touches[0].clientY;
}

const scrollOnTouchFunction = (event) => {
   event.preventDefault();
   functionThrottling();

   let currentClientX = event.touches[0].clientX;
   let currentClientY = event.touches[0].clientY;

   const diffX = startTouchX - currentClientX;
   const diffY = startTouchY - currentClientY;

   if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
         // console.log('Swipe right');
      } else if (diffX < 0) {
         // console.log('Swipe left');
      }
   } else {
      if (diffY > 0 && circleIndex < circles.length - 1) {
         circleIndex++;
         modifyActiveCircle();
         scrollToSection();
      } else if (diffY < 0 && circleIndex > 0) {
         circleIndex--;
         modifyActiveCircle();
         scrollToSection();
      }
   }

   wrapper.removeEventListener('touchmove', scrollOnTouchFunction);
   setTimeout(() => {
      wrapper.addEventListener('touchmove', scrollOnTouchFunction);
   }, 500);
}

const setEventListeners = () => {
   wrapper.addEventListener('wheel', scrollOnWheelFunction);

   document.addEventListener('keydown', scrollOnKeydownFunction);

   circles.forEach(circle => circle.addEventListener('click', scrollOnClickFunction));
   circles.forEach(circle => circle.addEventListener('touchstart', scrollOnClickFunction));

   wrapper.addEventListener('touchstart', touchstartFunction);
   wrapper.addEventListener('touchmove', scrollOnTouchFunction);
}

createArticles(articles);

const circles = document.querySelectorAll('.circle');
const sections = document.querySelectorAll('.main__section');

document.addEventListener('DOMContentLoaded', setEventListeners);