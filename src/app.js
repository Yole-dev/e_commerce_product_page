`use strict`;

const main = document.querySelector('.main');

if(main.getBoundingClientRect().width <= 400) {
  document.querySelector('.mobile_slider').style.marginBottom = '3rem';
};


//Product slider components
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnContainer = document.querySelector('.slider__controls')
const btns = document.querySelectorAll('.slider__btn');

const thumbnailContainer = document.querySelector('.thumbnails');
const thumbnails = document.querySelectorAll('.thumbnail_img');


let curSlide = 0;
const maxSlide = slides.length;

//creating the thumbnail function
const activateThumbnail = function(slide) {
  slides.forEach((_, i) => {
    if(i === curSlide) {
      thumbnails.forEach((thumbnail, i) => {
        if(i === curSlide) {
          thumbnail.classList.add('thumbnail_active');
        } else if(i > curSlide || i < curSlide) {
          thumbnail.classList.remove('thumbnail_active');
        }
      });
    }
  });
}

const goToSlide = function(slide) {
    slides.forEach((s, i) => (s.style.transform = 
      `translateX(${100 * (i - slide)}%)`));

    // hiding the controls
    if (main.getBoundingClientRect().width >= 800 && btnContainer.classList.contains('mobile')) {
      btnContainer.style.display = 'none';
    }
};

goToSlide(0);


//next slide function
const nextSlide = function () {
    if(main.getBoundingClientRect().width >= 800 
    && slider.classList.contains('stop')) return;

    if(curSlide === maxSlide - 1){
      curSlide = 0;
    } else {
      curSlide++;
    }
  
    goToSlide(curSlide);
    activateThumbnail(curSlide);
};

//previous slide function
const prevSlide = function() {

    if(main.getBoundingClientRect().width >= 800 
    && slider.classList.contains('stop')) return;

    if(curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateThumbnail(curSlide);
};

//implementing the click event for the slider buttons
btns.forEach(btn => {
  btn.addEventListener('click', 
    () => btn.classList.contains('slider__btn--left') ? prevSlide() : nextSlide()
  )
});

//i'll come back to this later
// implementing the click event for product thumbnails
// thumbnailContainer.addEventListener('click', (e) => {
//   if(e.target.classList.contains('thumbnail_img')) {
//     thumbnails.forEach((_, i) => {
      
//     });
//   }

// });


// Navigation bar component
const navBar = document.querySelector('.nav_component');
const openNav = document.querySelector('.open_nav');
const closeNav = document.querySelector('.close_nav');

openNav.addEventListener('click', () => 
  navBar.style.display = 'grid'
);

closeNav.addEventListener('click', () => 
  navBar.style.display = 'none'
);

//Shopping Cart component
const cartContainer = document.querySelector('.cart_component');
const itemContainer = document.querySelector('.item_container');
const emptyMessage = document.querySelector('.empty_cart');
const openCart = document.querySelector('.open_cart');
const closeCart = document.querySelector('.close_cart');
const cartInputCheck = document.querySelector('.quantity');
const items = document.querySelector('.items');


openCart.addEventListener('click', () => {
  cartContainer.style.display = 'flex';
  openCart.style.display = 'none';
  closeCart.style.display = 'block';

  if(cartInputCheck.value === 0 ||cartInputCheck.value === ''){
    document.querySelector('.empty_cart').style.display = 'block';
  }
});

closeCart.addEventListener('click', () => {
  cartContainer.style.display = 'none';
  openCart.style.display = 'block';
  closeCart.style.display = 'none';
});


//quantity component 
const input = document.querySelector('.quantity');
const selectQuantity = document.querySelector('.select_quantity');

selectQuantity.addEventListener('click', (e) => {
  if(e.target.classList.contains('plus')) {
    input.value ++;
  } else if(e.target.classList.contains('minus')) {
    if(input.value !== 0) input.value --;
  } else {
    return;
  }
});



//add to cart component and some components from the cart component
const addToCart = document.querySelector('.add_to_cart');
const price = document.querySelector('.price');
const itemName = document.querySelector('.item_name');

const itemArr = [];

addToCart.addEventListener('click', (e) => {
  e.preventDefault;
  if(input.value === 0 || input.value === '') {
    document.querySelector('.empty_cart').style.display = 'block';
    return;
  };

    
  if(document.querySelector('.empty_cart').style.display = 'block') {
      document.querySelector('.empty_cart').style.display = 'none';
  };

  if(input.value >= 1) {
    
    items.style.display= 'flex';
    const div = document.createElement('div');

    const content = `
                  <img src="images/image-product-1-thumbnail.jpg" alt="" class="item_img">

                  <div>
                    <p class="product_description">${itemName.innerHTML.replace('<br>', '')}</p>
                    <p class="total_cost">
                      ${price.innerHTML} &times; ${input.value}
                      <span class="cost_calc">$${(+(price.innerHTML.slice(1)) * input.value).toFixed(2)} </span>
                    </p>
                  </div>
                
                  <img src="images/icon-delete.svg" alt="a trashbin icon" class="delete_item" btn_index ="${itemArr.length}">
                `;

    div.insertAdjacentHTML('beforeend', content);
    div.setAttribute('index', `${itemArr.length}`);
    div.classList.add('item');

                        
    itemArr.push(div);
    console.log(itemArr, itemArr.length);

    items.appendChild(div);

    document.querySelector('.checkout_btn').style.display = 'block';

    const deleteBtn = document.querySelectorAll('.delete_item');

//deleting items from cart component
    deleteBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        if(div.getAttribute('index') === btn.getAttribute('btn_index')) div.remove();
      });
    });
  };
});




// desktop slider component 
const closeSlider = document.querySelector('.close_max_slide');
const desktopSlider = document.querySelector('.desktop_slider');
const desktopSlide = document.querySelector('.desktop_slide_container');


//open desktop slide
  slider.addEventListener('click', () => {
    if(main.getBoundingClientRect().width >= 800) {
      desktopSlider.style.display = 'flex';

//Preventing the insertAdjacentHTML to occur on each click
      if(slider.classList.contains('prevent_duplicate_slide')) return;
      slider.classList.add('prevent_duplicate_slide');

      desktopSlide.insertAdjacentHTML('beforeend', `
        <div class="slider">
          <div class="slide"><img src="images/image-product-1.jpg" alt="product view 1"></div>
          <div class="slide"><img src="images/image-product-2.jpg" alt="product view 2"></div>
          <div class="slide"><img src="images/image-product-3.jpg" alt="product view 3"></div>
          <div class="slide"><img src="images/image-product-4.jpg" alt="product view 4"></div>
        </div>


        <div class="slider__controls desktop_controls">
          <div class="slider__btn slider__btn--left">
            <img src="images/icon-previous.svg" alt="left direction icon">
          </div>

          <div class="slider__btn slider__btn--right">
            <img src="images/icon-next.svg" alt="right direction icon">
          </div>
        </div>


        <div class="thumbnails">
          <div class="thumbnail"><img src="images/image-product-1-thumbnail.jpg" alt="product thumbnail image 1" class="thumbnail_img thumbnail_active"></div>
          <div class="thumbnail"><img src="images/image-product-2-thumbnail.jpg" alt="product thumbnail image 2" class="thumbnail_img"></div>
          <div class="thumbnail"><img src="images/image-product-3-thumbnail.jpg" alt="product thumbnail image 3" class="thumbnail_img"></div>
          <div class="thumbnail"><img src="images/image-product-4-thumbnail.jpg" alt="product thumbnail image 4" class="thumbnail_img"></div>
        </div> 
      `);
    }
  });

// close maxslide
closeSlider.addEventListener('click', () => desktopSlider.style.display = 'none');

  