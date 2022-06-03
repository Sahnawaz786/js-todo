let check = document.querySelectorAll(".fa-check");
let trash = document.querySelectorAll(".fa-trash");
let edit = document.querySelectorAll(".fa-edit");
const filter = document.querySelector(".fa-filter");
const task = document.querySelector(".task");
const form = document.querySelector(".form");
const searchBar = document.querySelector(".search-input");
const task_btn = document.querySelector(".btn");
const add_task_btn = document.querySelectorAll(".task-btn");
const content = document.querySelector(".content");
const navbar = document.querySelector(".navbar");
const main = document.querySelector(".main");
const all = document.querySelector(".all");
const otherPart = document.getElementsByTagName("body");
const task_title = document.querySelector(".task-title");
const task_desc = document.querySelector(".task-desc");
const task_time = document.querySelector(".task-time");
const error_title = document.querySelector(".title-task");
const error_desc = document.querySelector(".title-desc");
const error_time = document.querySelector(".title-time");
let content_data = document.querySelectorAll(".content-data");
const filter_options = document.querySelector(".filter-options");
const close = document.querySelector(".filter_popup");
const close_add_task = document.querySelector(".close_add_task");

let edit_title = "";

//array of tasks
let taskData = [
  "Summer Sprint",
  "Winter Sprint",
  "Test 1",
  "Test 2",
  "Test 3",
  "Test 4",
  "Test 5",
  "Test 6",
  "Test 7",
  "Test 8",
  "Test 9",
];

let check_icons = [];
let task_complete_before = [];

//task date array
let taskdate = [
  "Tue May 31 2022 06:59:32",
  "Tue May 31 2022 06:59:32", //yyyy-MM-ddThh:mm
  "Tue May 31 2022 06:59:32",
  "Tue May 31 2022 06:59:32",
  "Tue May 31 2022 06:59:32",
  "Tue May 31 2022 06:59:32",
  "Tue May 31 2022 06:59:32",
  "Tue May 31 2022 06:59:32",
  "Tue May 31 2022 06:59:32",
  "Tue May 31 2022 06:59:32",
  "Tue May 31 2022 06:59:32",
];

let taskmessage = [
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
  "netlify is a san francisco-based cloud computing company that offers hosting and serverless backend services for web applications",
];

//All functionality starts from here

//date related function

let padTo2Digits = function (num) {
  return num.toString().padStart(2, "0");
};

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    "T" +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()), // 👈️ can also add seconds
    ].join(":")
  );
}

// console.log(formatDate(new Date("Tue May 31 2022 06:59:32")));

//apply event handler to each tick icon

const checked_icon = function (check) {
  check.forEach((elem, index) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      let target = e.target.closest(".content-data");
      let task_status = target.firstElementChild.firstElementChild;
      console.log("first===>", task_complete_before);
      if (!target.classList.contains("task-completed")) {
        target.classList.add("task-completed");
        target.classList.remove("task-notCompleted");
        target.classList.remove("complete-before");
        task_status.textContent = "completed";
        check_icons.push(index);
        let new_index = task_complete_before.findIndex((elem) => index);
        task_complete_before.splice(new_index, 1);
        // task_complete_before = [];
      } else {
        // target.classList.remove("task-completed");
        if (
          target.classList.contains("tomo") ||
          task_complete_before.length > 0
        ) {
          target.classList.remove("task-completed");
          target.classList.add("complete-before");
          target.classList.add("tomo");
          task_status.textContent = "Complete Before ";
          task_complete_before.push(index);
          check_icons.splice(index, 1);
        } else {
          target.classList.remove("task-completed");
          target.classList.add("task-notCompleted");
          task_status.textContent = "pending ";
          check_icons.splice(index, 1);
        }
      }
      console.log("last===>", task_complete_before);
    });
  });
};

//apply event handler to each delete icon

const delete_icon = function (trash) {
  trash.forEach((elem, index) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      let target = e.target.closest(".content-data");
      let k = target.firstElementChild.nextElementSibling.innerText;
      let indexs = taskData.findIndex((elem) => elem == k);

      console.log(index);
      // console.log(check_icons);

      taskData.splice(indexs, 1);
      taskmessage.splice(indexs, 1);
      taskdate.splice(indexs, 1);
      if (
        check_icons.includes(index) &&
        target.classList.contains("task-completed")
      ) {
        console.log("mil gaya");
        let delete_elem = check_icons.findIndex((elem) => elem == index);
        check_icons.splice(delete_elem, 1);
        if (check_icons.length > 0) {
          check_icons = check_icons.map((elem, index) => {
            return elem > delete_elem ? (elem = elem - 1) : elem;
          });
        }
        console.log(check_icons);
      } else {
        if (check_icons.length > 0) {
          let newarr = check_icons.sort((a, b) => a - b); // [1,2,5,6]

          check_icons = newarr?.map((elem) => {
            return elem < index ? elem : elem - 1;
          });
        }
      }
      UpadteUI(taskData, taskdate);
    });
  });
};

//edit btn functionality

const edit_icon = function (edit) {
  edit.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      e.preventDefault();
      let target = e.target.closest(".content-data");
      let task_status = target.children;
      let time = task_status[0].innerText.slice("pending".length, -1);
      let title = task_status[1].innerText;
      let desc = task_status[2].innerText;
      edit_title = title;
      task.classList.remove("hidden");
      navbar.classList.add("blur");
      main.classList.add("blur");
      task_title.value = `${title}`;
      task_desc.value = `${desc}`;
      task_time.value = formatDate(new Date(time));
    });
  });
};

//func to remove unwanted classes

const remove_unrequ_classes = () => {
  task.classList.add("hidden");
  navbar.classList.remove("blur");
  main.classList.remove("blur");
  error_title.classList.add("hidden");
  error_desc.classList.add("hidden");
  error_time.classList.add("hidden");
};

//handling add_task btn
add_task_btn.forEach((elem) => {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target);
    let title = task_title.value;
    let desc = task_desc.value;
    let time = new Date(task_time.value);
    // time = time.setDate(time.getDate() + 1);
    // console.log("time is ", time.setDate(time.getDate() + 1));
    title == "" && error_title.classList.remove("hidden");
    desc == "" && error_desc.classList.remove("hidden");
    time == "Invalid Date" && error_time.classList.remove("hidden");
    if (title != "" && desc != "" && time != "Invalid Date") {
      task_title.value = `${title}`;
      task_desc.value = `${desc}`;
      task_time.value = `${time}`;
      if (!form.classList.contains("new-task")) {
        let index = taskData.findIndex((elem) => elem == edit_title);
        taskData[index] = title;
        taskmessage[index] = desc;
        console.log(time.toString("YYYY-MM-dd"));
        taskdate[index] = time.toString("YYYY-MM-dd").slice(0, -31);
      } else {
        console.log(time.setDate(time.getDate() + 1));
        taskData.push(title);
        taskdate.push(time.toString("YYYY-MM-dd").slice(0, -31));
        taskmessage.push(desc);
        task_complete_before.push(taskData.length - 1);
      }
      form.classList.remove("new-task");
      edit_title = "";
      task_title.value = task_desc.value = task_time.value = "";
      console.log(task_title.value);
      remove_unrequ_classes();
      UpadteUI(taskData, taskdate);
    }
  });
});

task_btn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e);
  task.classList.remove("hidden");
  navbar.classList.add("blur");
  main.classList.add("blur");
  form.classList.add("new-task");
});

// for coloring the task as it is after updating UI

const task_color_green = function () {
  let content_data = document.querySelectorAll(".content-data");
  console.log(content_data);
  check_icons?.forEach((elem) => {
    if (content_data[elem] != undefined) {
      content_data[elem].classList.add("task-completed");
      content_data[elem].classList.remove("task-notCompleted");
      content_data[elem].firstElementChild.firstElementChild.textContent =
        "Completed";
    }
  });
};

const task_color_violet = function () {
  let content_data = document.querySelectorAll(".content-data");
  console.log(content_data);
  task_complete_before.forEach((elem) => {
    if (content_data[elem] != undefined) {
      content_data[elem]?.classList.remove("task-completed");
      content_data[elem]?.classList.add("complete-before");
      content_data[elem]?.classList.add("tomo");
      content_data[elem]?.classList.remove("task-notCompleted");
      content_data[elem].firstElementChild.firstElementChild.textContent =
        "Completed Before";
    }
  });
};

//function to add new task
const UpadteUI = function (taskname, dates, taskmessagesk = "") {
  content.innerHTML = "";
  taskname.forEach((elem, index) => {
    const html = `<div class="content-data task-notCompleted">
        <p class="c-para">
                <strong class="strong">Pending</strong>${dates.at(index)}
              </p>
        <h3 class="c-heading">${taskname.at(index)}</h3>
        <p class="c-content">
          ${taskmessage.at(index)}
        </p>
        <div class="task-icons">
          <div class="icons">
            <i class="fa fa-check icon-img"></i>
            <i class="fa fa-edit icon-img"></i>
            <i class="fa fa-trash icon-img"></i>
          </div>
        </div>`;
    content.insertAdjacentHTML("beforeend", html);
  });
  task_color_green();
  task_color_violet();
  //calling check and trash fn to apply the icon fin to newly created tasks
  check = document.querySelectorAll(".fa-check");
  trash = document.querySelectorAll(".fa-trash");
  edit = document.querySelectorAll(".fa-edit");
  checked_icon(check);
  delete_icon(trash);
  edit_icon(edit);
};

UpadteUI(taskData, taskdate, taskmessage);

//search functionality

searchBar.addEventListener("keyup", function (e) {
  e.preventDefault();
  let text = searchBar.value;
  let content_data = document.querySelectorAll(".content-data");
  content_data.forEach((elem) => {
    if (!elem.children[1].innerText.toLowerCase().includes(text)) {
      elem.classList.add("hidden");
    } else {
      elem.classList.remove("hidden");
    }
  });
});

//filter functionality

filter.addEventListener("click", function (e) {
  e.preventDefault();
  if (filter_options.classList.contains("hidden")) {
    filter_options.classList.remove("hidden");
    console.log("hello");
  } else {
    filter_options.classList.add("hidden");
    UpadteUI(taskData, taskdate);
  }
});

//closing the filter functionality
close.addEventListener("click", function (e) {
  filter_options.classList.add("hidden");
  UpadteUI(taskData, taskdate);
});

//operation to perform on clicking filter options btns
filter_options.addEventListener("click", function (e) {
  if (e.target.innerText == "Completed") {
    UpadteUI(taskData, taskdate);
    let content_data = document.querySelectorAll(".content-data");
    content_data.forEach((elem, index) => {
      if (!elem.classList.contains("task-completed"))
        elem.classList.add("hidden");
    });
  }
  if (e.target.innerText == "All Task") {
    let content_data = document.querySelectorAll(".content-data");
    UpadteUI(taskData, taskdate);
  }
  if (e.target.innerText == "Pending") {
    UpadteUI(taskData, taskdate);
    let content_data = document.querySelectorAll(".content-data");
    content_data.forEach((elem, index) => {
      if (
        elem.classList.contains("task-completed") ||
        elem.classList.contains("complete-before")
      )
        elem.classList.add("hidden");
    });
  }

  if (e.target.innerText == "Not Completed") {
    UpadteUI(taskData, taskdate);
    let content_data = document.querySelectorAll(".content-data");
    content_data.forEach((elem, index) => {
      if (
        elem.classList.contains("task-completed") ||
        elem.classList.contains("task-notCompleted")
      )
        elem.classList.add("hidden");
    });
  }
});

//close add_new_task screen popup
close_add_task.addEventListener("click", function (e) {
  remove_unrequ_classes();
});
