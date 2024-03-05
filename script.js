$(function () {
  // Function to update time-block classes based on current hour
  function updateTimeBlocks() {
    // Get current hour using dayjs library
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      // Extract hour from id attribute
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Function to load user input from local storage
  function loadUserInput() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var userInput = localStorage.getItem(blockId);
      $(this).find(".description").val(userInput);
    });
  }

  // Function to save user input to local storage
  $(".saveBtn").on("click", function () {
    var blockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(blockId, userInput);
  });

  // Display current date in header
  $("#currentDay").text(dayjs().format("dddd MMMM D, YYYY"));

  // Initial setup
  updateTimeBlocks();
  loadUserInput();
});
