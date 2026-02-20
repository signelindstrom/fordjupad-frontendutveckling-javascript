// checks local storage to see if user is logged in, and if so, displays their name
const loggedInUser = localStorage.getItem("loggedInUser");

// does not let you enter page unless logged in
if (loggedInUser === null) {
  location.assign("../index.html");
} else {
  document.getElementById("loggedInUser").innerText =
    `Hello, ${localStorage.getItem("loggedInUser")}`;
}

// log out and redirect to start page (index.html)
document.getElementById("logOutBtn").addEventListener("click", () => {
  localStorage.clear("loggedInUser");
  location.assign("../index.html");
});

// get list for courses
const courseListElement = document.getElementById("courseList");

// calls for function to get course information
getCourseData();

// gets list of teachers
async function getTeacherNames() {
  const response = await fetch("https://jek-hb.github.io/portal/teachers.json");
  const data = await response.json();

  // adds all teacher information in array
  const teacherArray = Object.values(data);
  // sends array of teachers to calling point
  return teacherArray;
}

async function getCourseData() {
  const response = await fetch("https://jek-hb.github.io/portal/courses.json");
  const data = await response.json();

  // calls for teacher names from function
  const teacherNames = await getTeacherNames();

  // adds all course information in array
  const courseArray = Object.values(data);

  // sends array with courses to funtion to display in list
  listCourses(courseArray);

  // function get all informtation about courses and add to list
  function listCourses(array) {
    array.forEach((element) => {
      // creates parent element to display course information
      const dispayCourseInformation = document.createElement("section");
      courseListElement.append(dispayCourseInformation);

      // creates elements to display all course information
      const courseIdElement = document.createElement("p");
      courseIdElement.innerText = `Course ${element.courseId}`;

      const courseNameElement = document.createElement("h2");
      courseNameElement.innerText = element.courseName;

      const creditElement = document.createElement("h3");
      creditElement.innerText = `${element.credit} Credits`;

      const durationElement = document.createElement("p");
      durationElement.innerText = `Week ${element.startWeek} - ${element.endWeek}`;

      const teachersElement = document.createElement("ul");
      teachersElement.innerText = `Teachers: `;
      // gets full name of teacher and displays it
      teacherNames.forEach((teacher) => {
        // compare teacher initials from course endpoint and teacher endpoint
        // teacher first and last names are display if a match
        if (element.teachers == teacher.id.name) {
          teachersElement.innerText += `${teacher.name.first} ${teacher.name.last}`;
        }
        // if course teachers are more then one, they get displayed in as list items
        else if (element.teachers.length !== 1) {
          const multipleTeachers = element.teachers;
          multipleTeachers.forEach((initials) => {
            if (initials == teacher.id.name) {
              const teacherList = document.createElement("li");
              teachersElement.append(teacherList);
              teacherList.innerText += `${teacher.name.first} ${teacher.name.last}`;
            }
          });
        }
      });

      // append all child elements to parent element, to displat all information about course
      dispayCourseInformation.append(
        courseIdElement,
        courseNameElement,
        creditElement,
        durationElement,
        teachersElement,
      );
    });
  }
}
