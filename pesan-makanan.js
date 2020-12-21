const openBrowser = document.querySelector("#tombol-browser"),
  body = document.querySelector("body"),
  profilContainer = document.querySelector("#profil"),
  boxMakanan = document.querySelectorAll(".box-makanan"),
  containerFloatBtnPesanan = document.createElement("div"),
  modal = document.createElement("div");

containerFloatBtnPesanan.setAttribute("id", "float-btn-pesanan");
containerFloatBtnPesanan.innerHTML = `<div class="container px-2">
                      <button class="btn-success btn">
                        <p class="m-0">
                  
                        <span></span>
                        <span></span
                          >
                        </p>
                      </button>
                      </div>`;

modal.classList = "close-modal d-none";
modal.setAttribute("id", "container-modal");
modal.innerHTML = `<div id="field-content" class="container close-modal d-none">
                    <div class="bg-white modal-change-size" id="main-modal">

                      <div>
                        <hr class="close-modal" />
                        <img src="" class="img-fluid" alt="" />
                      </div>

                      <div>
                        <p id="judul"></p>
                        <div>
                          <small id="deskripsi"></small>  
                          <p id="harga"></p>
                        </div>
                      </div>

                      <div>
                        <button class="btn btn-success close-modal">Tambah pesanan</button>
                      </div>
                      
                    </div>
                  </div>`;

//remove hover jika dibuka dimobile

class DaftarMenu {
  constructor(jenis, namaMakanan, harga, quantity = 0) {
    this.jenis = jenis;
    this.nama = namaMakanan;
    this.qyt = quantity;
    this.harga = harga;
  }

  cetakHarga() {
    return this.harga * this.qyt;
  }
}

const m1 = new DaftarMenu("Makanan", "Burger Kampung Beef", 25000),
  m2 = new DaftarMenu("Makanan", "Potato Chrunch", 23000),
  m3 = new DaftarMenu("Minuman", "Milkshake", 17900),
  m4 = new DaftarMenu("Minuman", "Ice Cream and Hot Chocolate Powder", 22500),
  pesanan = [m1, m2, m3, m4];

const floatBtnPesanan = containerFloatBtnPesanan.children[0].children[0];
window.onload = () => {
  if (detectMob()) {
    Array.from(body.children).forEach((el) => el.classList.remove("hover"));
    floatBtnPesanan.classList.remove("hover");
  }
};
let intervalBtnFloat,
  timerBtnFloat,
  cetakJmlPesanan = () => {
    let totalHarga = 0,
      totalItem = 0;
    pesanan.forEach((menu) => {
      if (menu.cetakHarga() > 0) {
        totalHarga += parseInt(menu.cetakHarga());
        totalItem += parseInt(menu.qyt);

        floatBtnPesanan.children[0].children[0].textContent = `${totalItem} item`;
        floatBtnPesanan.children[0].children[1].textContent = `Rp ${totalHarga
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
    });

    if (totalItem == 1) {
      timerBtnFloat = 0;
      intervalBtnFloat = setInterval(() => {
        timerBtnFloat++;
      }, 1);
    } else {
      clearInterval(intervalBtnFloat);
      timerBtnFloat = timerBtnFloat <= 100 ? 0 : 500;
    }

    if (totalHarga == 0) {
      containerFloatBtnPesanan.style.bottom = "-7em";
      setTimeout(() => {
        containerFloatBtnPesanan.remove();
      }, timerBtnFloat);
    } else {
      if (body.querySelector("#float-btn-pesanan") == null) {
        document
          .querySelector("body > .container")
          .insertAdjacentElement("afterend", containerFloatBtnPesanan);
        containerFloatBtnPesanan.style.bottom = "-7em";

        setTimeout(() => {
          containerFloatBtnPesanan.style.bottom = "0";
        }, 0);
      }
    }
  };

floatBtnPesanan.addEventListener("click", () => {
  floatBtnPesanan.style.transform = "translateY(-0.8em)";
  setTimeout(() => {
    floatBtnPesanan.style.removeProperty("transform");
  }, 300);
});

let update = (namaMakanan, qty) => {
  pesanan.forEach((menu) => {
    if (menu.nama == namaMakanan) {
      menu.qyt = qty;
    }
  });
  cetakJmlPesanan();
};

// fungsi untuk penambahan quantity
document.querySelectorAll(".tombol-tambah").forEach((e) =>
  e.addEventListener("click", function () {
    changeDisplay(this.parentElement.children);
    this.parentElement.children[2].textContent = 1;
    this.parentElement.parentElement.previousElementSibling.style.boxShadow =
      "inset 0.2em 0  #28a745";

    update(
      this.parentElement.parentElement.previousElementSibling.children[0]
        .textContent,
      this.parentElement.children[2].textContent
    );
  })
);

document.querySelectorAll(".tombol-inc").forEach((inc) => {
  inc.classList.add("btn-success");
  inc.addEventListener("click", function () {
    this.previousElementSibling.textContent =
      parseInt(this.previousElementSibling.textContent) + 1;

    update(
      this.parentElement.parentElement.previousElementSibling.children[0]
        .textContent,
      this.previousElementSibling.textContent
    );
  });
});
document.querySelectorAll(".tombol-dec").forEach((dec) => {
  dec.classList.add("btn-danger");
  dec.addEventListener("click", function () {
    this.nextElementSibling.textContent -= 1;
    if (this.nextElementSibling.textContent < 1) {
      changeDisplay(this.parentElement.children);
      this.nextElementSibling.textContent = "";
      this.parentElement.parentElement.previousElementSibling.style.removeProperty(
        "box-shadow"
      );
    }
    update(
      this.parentElement.parentElement.previousElementSibling.children[0]
        .textContent,
      this.nextElementSibling.textContent
    );
  });
});

function changeDisplay(children) {
  Array.from(children).forEach((e) => e.classList.toggle("d-none"));
}

// fungsi bagian modal
const mainModal = modal.children[0].children[0];
let st = 0,
  mv = 0;

mainModal.addEventListener("touchstart", function (start) {
  st = start.touches[0].pageY;
  this.addEventListener("touchmove", (mvs) => {
    mv = mvs.touches[0].pageY;
    if (st + 50 < mv) {
      closeModal();
      st = 0;
      mv = 0;
      timer = 200;
    }
  });
});

//fungsi untuk mencek perangkat dibuka dimana
function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function disableScroll() {
  if (detectMob()) {
    body.classList.add("overflow-hidden");
  } else {
    let yScroll = window.scrollY;
    window.onscroll = () => {
      window.scrollTo(0, yScroll);
    };
  }
  containerFloatBtnPesanan.style.bottom = "-7em";
}

function enableScroll() {
  if (detectMob()) {
    body.classList.remove("overflow-hidden");
  } else {
    window.onscroll = () => {
      return;
    };
  }
  containerFloatBtnPesanan.style.bottom = "0";
}

function openModal() {
  disableScroll();
  mainModal.parentElement.classList.remove("d-none");
  mainModal.parentElement.parentElement.classList.remove("d-none");
  setTimeout(() => {
    document
      .querySelector("body > .container")
      .insertAdjacentElement("afterend", modal);
  }, 100);
  setTimeout(() => {
    mainModal.classList.remove("modal-change-size");
  }, 160);

  setTimeout(() => {
    modal.style.background = " #302f2f48";
    mainModal.classList.add("close-now");
  }, 700);
}

function closeModal() {
  boxThis = undefined;
  if (mainModal.classList.contains("close-now")) {
    modal.style.removeProperty("background");
    mainModal.classList.remove("close-now");
    mainModal.classList.add("modal-change-size");

    setTimeout(() => {
      mainModal.parentElement.classList.add("d-none");
      mainModal.parentElement.parentElement.classList.add("d-none");
      modal.remove();
    }, 500);

    setTimeout(() => {
      enableScroll();
    }, 600);
  }
}

mainModal.parentElement.parentElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-modal")) closeModal();
});

let boxThis;
boxMakanan.forEach((box) => {
  box.addEventListener("click", function (e) {
    // animasi ketika box makanan diklik
    let effect = document.createElement("span"),
      pos = getPosition(this);
    effect.classList.add("effect");
    effect.style.transform = `translate3d(
      ${e.pageX - pos.x - 10}px, ${e.pageY - pos.y - 10}px
    ,0)`;

    if (!e.target.parentElement.classList.contains("tombol")) {
      this.appendChild(effect);
      boxThis = this;
      openModal();
      setTimeout(() => {
        effect.remove();
      }, 500);
    }

    mainModal.children[0].children[1].src = this.children[1].children[0].src;
    mainModal.children[1].children[0].textContent = this.children[0].children[0].textContent;
    mainModal.children[1].children[1].children[0].textContent = this.children[0].children[1].textContent;
    mainModal.children[1].children[1].children[1].textContent = this.children[0].children[2].textContent;
  });
});

//pangambilan posisi dari ukuran element
function getPosition(el) {
  let xPosition = 0,
    yPosition = 0;

  while (el) {
    xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
    yPosition += el.offsetTop - el.scrollTop + el.clientTop;
    el = el.offsetParent;
  }

  return {
    x: xPosition,
    y: yPosition,
  };
}

mainModal.children[2].children[0].addEventListener("click", () => {
  const quantity = boxThis.children[1].children[1].children[2];
  if (quantity.textContent == "") {
    quantity.previousElementSibling.previousElementSibling.click();
  } else {
    quantity.nextElementSibling.click();
  }
});

// animasi float btn
let timer = null;
window.addEventListener(
  "scroll",
  function () {
    if (timer !== null) {
      containerFloatBtnPesanan.style.bottom = "-7em";
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      containerFloatBtnPesanan.style.bottom =
        boxThis != undefined ? "-7em" : "0";
    }, 500);
  },
  false
);
