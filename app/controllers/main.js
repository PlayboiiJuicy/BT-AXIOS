getUsers();

function getUsers(search) {
  apiGetUsers(search)
    .then((response) => {
      // console.log(response.data);
      let users = response.data.map((user) => {
        return new User(
          user.id,
          user.taiKhoan,
          user.hoTen,
          user.matKhau,
          user.email,
          user.loaiND,
          user.ngonNgu,
          user.moTa,
          user.hinhAnh
        );
      });

      display(users);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addUser(obj) {
  apiAddUser(obj)
    .then(() => {
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteUser(id) {
  apiDeleteUser(id)
    .then(() => {
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}

function editUser(id) {
  apiGetUserById(id)
    .then((response) => {
      // console.log(response.data.id);
      let editUser = response.data;
      // console.log(editUser.id);
      console.log("edit", editUser);

      dom("#maId").value = editUser.id;
      dom("#TaiKhoan").value = editUser.taiKhoan;
      dom("#HoTen").value = editUser.hoTen;
      dom("#MatKhau").value = editUser.matKhau;
      dom("#Email").value = editUser.email;
      dom("#HinhAnh").value = editUser.hinhAnh;
      dom("#loaiNguoiDung").value = editUser.loaiND;
      dom("#loaiNgonNgu").value = editUser.ngonNgu;
      dom("#MoTa").value = editUser.moTa;

      let isValid = validateForm();
      if (!isValid) return;
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateUser(id, user) {
  apiUpdateUser(id, user)
    .then(() => {
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}

function display(obj) {
  let output = obj.reduce((result, item) => {
    return (
      result +
      `
    <tr>
    <td>${item.id}</td>
    <td>${item.taiKhoan}</td>
    <td>${item.matKhau}</td>
    <td>${item.hoTen}</td>
    <td>${item.email}</td>
    <td>${item.ngonNgu}</td>
    <td>${item.loaiND}</td>
    

    <td>
    <button class="btn btn-info" 
    data-type="edit"
    data-id="${item.id}"
    data-toggle="modal"
    data-target="#myModal"
    >S???a</button>

    <button class="btn btn-danger"
     data-type="delete"
     data-id="${item.id}">X??a</button>
    
    </td>
    </tr>
    `
    );
  }, "");
  dom("#tblDanhSachNguoiDung").innerHTML = output;
}

//===========================================================

dom("#btnThemNguoiDung").addEventListener("click", () => {
  dom(".modal-title").innerHTML = "Th??m Ng?????i D??ng";
  dom(".modal-footer").innerHTML = `
  <button class="btn btn-success" data-type="add">Th??m</button>
  <button class="btn btn-secondary" data-dismiss="modal">H???y</button>`;

  resetForm();
});

dom("#tblNguoiDung").addEventListener("click", (event) => {
  let id = event.target.getAttribute("data-id");
  // console.log(id);
  let elType = event.target.getAttribute("data-type");

  if (elType === "delete") {
    deleteUser(id);
  } else if (elType === "edit") {
    dom(".modal-title").innerHTML = "Th??m Ng?????i D??ng";
    dom(".modal-footer").innerHTML = `
    <button class="btn btn-primary" data-type="update"> C???p Nh???t</button>
    <button class="btn btn-secondary" data-dismiss="modal"> H???y</button>`;

    editUser(id);
  }
});

dom(".modal-footer").addEventListener("click", (event) => {
  let elType = event.target.getAttribute("data-type");

  let id = dom("#maId").value;
  let taiKhoan = dom("#TaiKhoan").value;
  let hoTen = dom("#HoTen").value;
  let matKhau = dom("#MatKhau").value;
  let email = dom("#Email").value;
  let hinhAnh = dom("#HinhAnh").value;
  let loaiND = dom("#loaiNguoiDung").value;
  let ngonNgu = dom("#loaiNgonNgu").value;
  let moTa = dom("#MoTa").value;

  let isValid = validateForm();
  if (!isValid) {
    return;
  }

  let user = new User(
    null,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  if (elType === "add") {
    addUser(user);
    resetForm();
  } else if (elType === "update") {
    updateUser(id, user);
  }
});

dom("#find").addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  // console.log(event.key);
  getUsers(event.target.value);
});

dom("#basic-addon2").onclick = function () {
  let find = dom("#find").value;
  getUsers(find);
};

//==========================================

function dom(selector) {
  return document.querySelector(selector);
}

function resetForm() {
  dom("#TaiKhoan").value = "";
  dom("#HoTen").value = "";
  dom("#MatKhau").value = "";
  dom("#Email").value = "";
  dom("#HinhAnh").value = "";
  dom("#loaiNguoiDung").value = "";
  dom("#loaiNgonNgu").value = "";
  dom("#MoTa").value = "";
}

//===================Validate=========================
let checkUsers = [];
apiGetUsers()
  .then((response) => {
    // console.log(response.data);
    checkUsers = response.data;
    // console.log(checkUsers);
  })
  .catch((error) => {
    console.log(error);
  });

function validateAccount() {
  let account = dom("#TaiKhoan").value;
  let spanEl = dom("#spanTk");

  let find = checkUsers.findIndex((value) => {
    return value.taiKhoan === account;
  });
  if (find !== -1) {
    marginX[0].classList.add("mb-0");

    spanEl.innerHTML = "T??i kho???n ???? b??? tr??ng";
    return false;
  }

  if (!account) {
    marginX[0].classList.add("mb-0");

    spanEl.innerHTML = "T??i kho???n kh??ng ????? tr???ng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateUsername() {
  let username = dom("#HoTen").value;
  let spanEl = dom("#spanHoTen");

  if (!username) {
    marginX[1].classList.add("mb-0");

    spanEl.innerHTML = "H??? T??n kh??ng ????? tr???ng";
    return false;
  }

  let regex = /[a-zA-Z][a-zA-Z ]{1,}/;
  if (!regex.test(username)) {
    marginX[1].classList.add("mb-0");

    spanEl.innerHTML = " H??? t??n kh??ng ch???a s??? v?? k?? t??? ?????c bi???t ";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validatePassword() {
  let password = dom("#MatKhau").value;
  let spanEl = dom("#spanMK");

  if (!password) {
    marginX[2].classList.add("mb-0");

    spanEl.innerHTML = " M???t kh???u kh??ng ???????c ????? tr???ng";
    return false;
  }

  let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
  if (!regex.test(password) || password.length < 6 || password.length > 8) {
    marginX[2].classList.add("mb-0");

    spanEl.innerHTML = `M???t kh???u c?? ??t nh???t 1 k?? t??? hoa, 1 k?? t??? ?????c bi???t, 1 k?? t???
    s???, ????? d??i 6-8`;
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateEmail() {
  let email = dom("#Email").value;
  let spanEl = dom("#spanEmail");

  if (!email) {
    marginX[3].classList.add("mb-0");

    spanEl.innerHTML = "Email kh??ng ???????c ????? tr???ng";
    return false;
  }

  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(email)) {
    marginX[3].classList.add("mb-0");

    spanEl.innerHTML = "Email ch??a ????ng ?????nh d???ng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateImage() {
  let image = dom("#HinhAnh").value;
  let spanEl = dom("#spanHinhAnh");

  if (!image) {
    marginX[4].classList.add("mb-0");

    spanEl.innerHTML = "H??nh ???nh kh??ng ???????c ????? tr???ng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateType() {
  let type = dom("#loaiNguoiDung").value;
  let spanEl = dom("#spanLoaiND");

  if (!type) {
    marginX[5].classList.add("mb-0");

    spanEl.innerHTML = "Ch??a ch???n lo???i ng?????i d??ng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateLanguage() {
  let language = dom("#loaiNgonNgu").value;
  let spanEl = dom("#spanNgonNgu");

  if (!language) {
    marginX[6].classList.add("mb-0");

    spanEl.innerHTML = "Ch??a ch???n lo???i ng??n ng???";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateDescribe() {
  let describe = dom("#MoTa").value;
  let spanEl = dom("#spanMota");

  if (!describe) {
    marginX[7].classList.add("mb-0");

    spanEl.innerHTML = "M?? t??? kh??ng ???????c ????? tr???ng";
    return false;
  }

  if (describe.length > 60) {
    marginX[7].classList.add("mb-0");

    spanEl.innerHTML = "M?? t??? kh??ng v?????t qu?? 60 k?? t???";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

let marginX = document.querySelectorAll(".form-group");

function validateForm() {
  let isValid = true;
  isValid =
    validateUsername() &
    validateAccount() &
    validatePassword() &
    validateEmail() &
    validateImage() &
    validateType() &
    validateLanguage() &
    validateDescribe();

  if (!isValid) {
    return false;
  }

  return true;
}

// dom("#TaiKhoan").insertAdjacentHTML(
//   "afterend",
//   createTag(`T??i Kho???n Kh??ng ???????c ????? Tr???ng`)
// );
// let txt = `T??i Kho???n Kh??ng ???????c ????? Tr???ng`;
// createTag(txt, "#divTK");

// function createTag(param, selector) {
//   // let tagSpan =
//   //   '<div style="background:red; margin: 5px; padding:5px; color:#FFF">' +
//   //   param +
//   //   "</div>";
//   // return tagSpan;

//   let tagSpan = document.createElement("span");
//   tagSpan.innerHTML = param;
//   tagSpan.style.color = "red";
//   dom(selector).appendChild(tagSpan);
// }
