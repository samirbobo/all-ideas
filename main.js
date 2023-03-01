/* start nav toggle */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelector(".links");
const icons = document.querySelectorAll(".change-background");

navToggle.addEventListener("click", showBackgroundNav);

function showBackgroundNav() {
  let LinksHeight = links.getBoundingClientRect().height; // 211.19
  let navLinksHeight = navLinks.getBoundingClientRect().height; // 0
  if (navLinksHeight > 0) {
    navLinks.style.height = `0px`;
    icons.forEach((i) => {
      i.style.top = `50%`;
    });
  } else {
    icons.forEach((i) => {
      i.style.top = `61%`;
    });
    navLinks.style.height = `${LinksHeight}px`;
  }
}

/* fixed nav */
const fixedNav = document.getElementById("nav");
window.addEventListener("scroll", scroll);
function scroll() {
  let windowHeight = window.pageYOffset;
  if (windowHeight >= 68) {
    fixedNav.classList.add("fixed-nav");
  } else {
    fixedNav.classList.remove("fixed-nav");
  }
  if(window.scrollY > 300) {
    btnScroll.classList.add("up-btn");
  }else {
    btnScroll.classList.remove("up-btn");
  }
}
/* click btn up */
const btnScroll = document.querySelector(".btn-scroll");
btnScroll.addEventListener("click", _ => {
  window.scrollTo({
    top : 0
  });
})
/* click nav link */
const linksA = document.querySelectorAll(".links a");
const nav = document.querySelector("nav");

linksA.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const section = document.getElementById(`${e.currentTarget.innerHTML}`);
    const navHeight = nav.getBoundingClientRect().height;
    let navLinksHeight = navLinks.getBoundingClientRect().height;
    let check = nav.classList.contains("fixed-nav");
    let position = section.offsetTop - navHeight;
    if (!check) {
      position = position - navHeight;
    }
    if (navHeight > 68) {
      position = position + navLinksHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });
    navLinks.style.height = "0px";
  });
});

/* change background img */
const backgroundImgs = document.querySelectorAll(".imgs");
const prevBtn = document.querySelector(".left");
const nextBtn = document.querySelector(".right");
let counterImg = 0;

backgroundImgs.forEach((img, index) => {
  img.style.left = `${index * 100}%`;
});
nextBtn.addEventListener("click", (_) => {
  counterImg++;
  change();
});
prevBtn.addEventListener("click", (_) => {
  counterImg--;
  change();
});

function change() {
  backgroundImgs.forEach((img) => {
    img.style.transform = `translateX(-${counterImg * 100}%)`;
  });
  if (counterImg === backgroundImgs.length - 1) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
  if (counterImg > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }
}

/* opacity services */
const services = document.querySelector(".services");
window.addEventListener("scroll", (_) => {
  let windowHeight = window.pageYOffset; // w >= 457 w < 657 + 500
  // console.log(windowHeight)
  if (windowHeight >= 457 && windowHeight <= services.offsetTop + 580) {
    services.style.opacity = "1";
  } else {
    services.style.opacity = "0";
  }
});

/* change Menu */
const mealsLi = document.querySelectorAll(".meals li");
const menuContent = document.querySelector(".menu-content");
const menu = [
  {
    category: "breakfast",
    img: "imgs/item-1.jpeg",
    title: "Buttermilk Pancakes",
    price: "$15.99",
    text: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed",
  },
  {
    category: "lunch",
    img: "imgs/item-2.jpeg",
    title: "Diner Double",
    price: "$13.99",
    text: "vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats",
  },
  {
    category: "shakes",
    img: "imgs/item-3.jpeg",
    title: "Godzilla Milkshake",
    price: "$6.99",
    text: "ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.",
  },
  {
    category: "breakfast",
    img: "imgs/item-4.jpeg",
    title: "Country Delight",
    price: "$20.99",
    text: "Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut.",
  },
  {
    category: "lunch",
    img: "imgs/item-5.jpeg",
    title: "Egg Attack",
    price: "$22.99",
    text: "franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up",
  },
  {
    category: "shakes",
    img: "imgs/item-6.jpeg",
    title: "Oreo Dream",
    price: "$18.99",
    text: "Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday",
  },
  {
    category: "dinner",
    img: "imgs/item-7.jpeg",
    title: "Bacon Overflow",
    price: "$8.99",
    text: "carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird",
  },
];
mealsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    /* remove the active btn */
    mealsLi.forEach((li) => {
      li.classList.remove("active");
    });
    /* add the active target btn */
    e.currentTarget.classList.add("active");

    let menuCategory = menu.filter((el) => {
      if (el.category === e.currentTarget.dataset.id) {
        return el;
      }
    });
    if (e.currentTarget.dataset.id === "all") {
      showMenu(menu);
    } else {
      showMenu(menuCategory);
    }
  });
});

function showMenu(menuItem) {
  let displayMenu = menuItem.map((item) => {
    return `<article class="menu-item">
    <img src="${item.img}" alt="">
    <div class="item-info">
      <div class="header-item">
        <h4>${item.title}</h4>
        <h4 class="price">${item.price}</h4>
      </div>
      <p class="item-text">
        ${item.text}
      </p>
    </div>
  </article>`;
  });
  displayMenu = displayMenu.join("");
  menuContent.innerHTML = displayMenu;
}

/* start video */
const switchBtn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");

switchBtn.addEventListener("click", (_) => {
  if (!switchBtn.classList.contains("slide")) {
    switchBtn.classList.add("slide");
    video.pause();
  } else {
    switchBtn.classList.remove("slide");
    video.play();
  }
});

/* start reviews */
const infoReview = [
  {
    img: "imgs/person-1.jpg",
    name: "Susan Smith",
    jop: "web developer",
    prag: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    img: "imgs/person-2.jpg",
    name: "Anna Johnson",
    jop: "WEB DESIGNER",
    prag: "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
  },
  {
    img: "imgs/person-3.jpg",
    name: "Peter Jones",
    jop: "INTERN",
    prag: "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
  },
  {
    img: "imgs/person-4.jpg",
    name: "Bill Anderson",
    jop: "THE BOSS",
    prag: "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic.",
  },
];
/* declare variables to change reviews */
const prev = document.querySelector(".prev-btn");
const next = document.querySelector(".next-btn");
const person = document.querySelector(".person");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.querySelector(".info");
let counterReview = 0;

next.addEventListener("click", nextReview);
prev.addEventListener("click", prevReview);
function nextReview() {
  counterReview++;
  if (counterReview > infoReview.length - 1) {
    counterReview = 0;
  }
  changeReviews();
}
function prevReview() {
  counterReview--;
  if (counterReview <= 0) {
    counterReview = infoReview.length - 1;
  }
  changeReviews();
}
function changeReviews() {
  person.src = infoReview[counterReview].img;
  author.innerHTML = infoReview[counterReview].name;
  job.innerHTML = infoReview[counterReview].jop;
  info.innerHTML = infoReview[counterReview].prag;
}
/* declare variables to change background color reviews */
const clickColor = document.querySelector(".clickColor");
const reset = document.querySelector(".reset");
const review = document.querySelector(".review");
const buttonReview = document.querySelector(".button-review");
const color = document.querySelector(".color");
const arrColor = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];
clickColor.addEventListener("click", (_) => {
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += arrColor[Math.floor(Math.random() * arrColor.length)];
  }
  review.style.backgroundColor = `#${result}`;
  color.innerHTML = `#${result}`;
  author.style.color = "white";
  job.style.color = "white";
  info.style.color = "white";
  buttonReview.classList.add("show");
});
reset.addEventListener("click", (_) => {
  color.innerHTML = `white`;
  review.style.backgroundColor = `white`;
  author.style.color = "black";
  job.style.color = "#46A6E9";
  info.style.color = "hsl(210, 22%, 49%)";
  buttonReview.classList.remove("show");
});

/* start modal */
const modalBtn = document.querySelector(".modal-btn");
const closeBtn = document.querySelector(".close-btn");
const modalOverlay = document.querySelector(".modal-overlay");
modalBtn.addEventListener("click", (_) => {
  modalOverlay.classList.add("show-modal");
});
closeBtn.addEventListener("click", (_) => {
  modalOverlay.classList.remove("show-modal");
});

/* start question */
const questionBtn = document.querySelectorAll("#toggle");
const question = document.querySelectorAll(".question");

questionBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parent = e.currentTarget.parentElement.parentElement.parentElement;
    if (e.currentTarget.classList.contains("fa-plus-square")) {
      questionBtn.forEach((removeBtn) => {
        removeBtn.classList.add("fa-plus-square");
      });
      question.forEach((removeText) => {
        removeText.classList.remove("show-question");
      });
      e.currentTarget.classList.add("fa-minus-square");
      e.currentTarget.classList.remove("fa-plus-square");
      parent.classList.add("show-question");
    } else {
      e.currentTarget.classList.remove("fa-minus-square");
      e.currentTarget.classList.add("fa-plus-square");
      parent.classList.remove("show-question");
    }
  });
});

/* start about section */
const tabBtn = document.querySelectorAll(".tab-btn");
const content = document.querySelectorAll(".content-info");
tabBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tabBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    const contentId = e.currentTarget.dataset.id;
    content.forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(`.about-center .${contentId}`)
      .classList.add("active");
  });
});

/* start grocery section */
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const alert = document.querySelector(".alert");
const groceryList = document.querySelector(".grocery-list");
const groceryInfo = document.querySelector(".grocery-info");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

/* اولا عند اضافه العناصر */
form.addEventListener("submit", addItem);
/* ثانيا عند حذف كل العناصر */
clearBtn.addEventListener("click", clearItems);
/* عند تحميل الصفحه لاول مره */
window.addEventListener("DOMContentLoaded", setupItems);

let editElement = "";
let editFlag = false;
let editId = "";

/* *******functions******* */
/* اولا لاضافه العناصر */
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem(id, value);
    displayAlert("item added to the list", "success");
    groceryInfo.classList.add("show-info");
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    editLocalStorage(editId, value);
    setBackToDefault();
    displayAlert("value changed", "success");
  } else {
    displayAlert("please enter value", "danger");
  }
}
function displayAlert(text, active) {
  alert.innerHTML = text;
  alert.classList.add(`alert-${active}`);
  setTimeout((_) => {
    alert.innerHTML = "";
    alert.classList.remove(`alert-${active}`);
  }, 1000);
}
/* عند التعديل ع العنصر */
function editItem(e) {
  const parent = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.parentElement.firstChild;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = parent.dataset.time;
  grocery.focus();
  submitBtn.innerHTML = "edit";
}
/* عند حذف اي عنصر */
function deleteItem(e) {
  const parent = e.currentTarget.parentElement.parentElement;
  const id = parent.dataset.time;
  groceryList.removeChild(parent);
  if (groceryList.children.length < 1) {
    groceryInfo.classList.remove("show-info");
  }
  displayAlert("item removed", "danger");
  removeFromLocalStorage(id);
}
/* لاعاده كل الاوبشن لوضعها الطبيعي */
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}
/* لحذف كل العناصر مره واحده */
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  items.forEach(function (item) {
    groceryList.removeChild(item);
  });
  groceryInfo.classList.remove("show-info");
  displayAlert("empty list", "danger");
  localStorage.removeItem("list");
  setBackToDefault();
}

/* *********local storge********* */
/* add To Local Storage */
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
/* لاختبار ما اذا كان هناك عنصر اسمه لاست ف الوكل استورتج او لا */
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
/* remove element From Local Storage */
function removeFromLocalStorage(id) {
  let remove = JSON.parse(localStorage.getItem("list"));
  remove = remove.filter((item) => {
    return item.id !== id;
  });
  localStorage.setItem("list", JSON.stringify(remove));
}
/* edit element Local Storage */
function editLocalStorage(editId, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === editId) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

/* عند تحميل  الصفحه هنفز هذه الفاينكشن */
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    groceryInfo.classList.add("show-info");
  }
}
/*  لانشا  العنصر الي بكتبه */
function createListItem(id, value) {
  /* number one create element */
  let article = document.createElement("article");
  article.setAttribute("data-time", id);
  article.classList.add("grocery-item");
  article.innerHTML = `<p class="title">${value}</p>
    <div class="btn-grocery">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;

  /* number tow create edit and delete buttons */
  let editBtn = article.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);
  let deleteBtn = article.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);

  /* number three append element to page */
  groceryList.appendChild(article);
}

/* strat section timer */
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const giveaway = document.querySelector(".giveaway");
let time , year, month, numberDay;
function changeHeader() {
  time = new Date();
  year = time.getFullYear();
  month = time.getMonth();
  numberDay = time.getDate();
  let day = time.getDay();
  let hour =
    time.getHours() > 12
      ? time.getHours() - 12 + ":" + time.getMinutes() + "pm"
      : time.getHours() + ":" + time.getMinutes() + "am";
  giveaway.innerHTML = `giveaway ends on ${weekdays[day]}, ${numberDay} ${months[month]} ${year} ${hour}`;
}
setInterval(changeHeader(),1000);

let itemsFormat = document.querySelectorAll(".deadline-format h4");
const deadline = document.querySelector('.deadline');

let future = new Date(year,month, numberDay + 15, 11, 30, 0).getTime();

function getRemaindingTime() {
  let dateNow = new Date().getTime();
  let t = future - dateNow;
  let oneDay = 1000 * 60 * 60 * 24;
  let oneHour = 1000 * 60 * 60;
  let oneMiunt = 1000 * 60;
  let days = Math.floor(t / oneDay);
  let hour = Math.floor((t % oneDay) / oneHour);
  let minute = Math.floor((t % oneHour) / oneMiunt);
  let seconds = Math.floor((t % oneMiunt) / 1000);
  let arr = [days, hour, minute, seconds];
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }
  itemsFormat.forEach((item, index) => {
    item.innerHTML = format(arr[index]);
  });
  if(t < 1) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}
let countdown = setInterval(getRemaindingTime, 1000);

/* start section footer */
const footerTime = document.querySelector(".footerTime");
footerTime.innerHTML = year;