(() => {
//////////////////////////////// Helpers ////////////////////////////////

//////// set booleans for window size
const body = document.body;
const cs = window.getComputedStyle(body, null);

let isPhone = cs.paddingBottom === '1px';
let isDesktop = cs.paddingBottom!== '1px';
let notDesktop = cs.paddingBottom === '1px';

window.addEventListener('resize', function() {
  isPhone = cs.paddingBottom === '1px';
  isDesktop = cs.paddingBottom !== '1px';
  notDesktop = cs.paddingBottom === '1px';
});

//////////////////////////////// Functions ////////////////////////////////

const changeHTML = (name) => {
  const text = `Hello ${name}`;
  const element = document.getElementById('js--headline');
  element.textContent = text;
};

changeHTML('Joshua');

})();