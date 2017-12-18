$(document).ready(function() {
  var addEvent = function(start, end) {
    var renderFormData = function() {
      if (form.elements[0].value.length > 0) {
        return form.elements;
      }
    };
    var renderEventOnCalendar = function() {
      var form = document.getElementById("form");
      var eventData;
      var roomNumber;
      var title = renderFormData();
      var studentName = title[0].value;
      var occupants = title[1].value;
      title[3].checked
        ? (roomNumber = "#1304 (Room on left)")
        : (roomNumber = "#1305 (Room on right)");
      eventData = {
        title: studentName,
        occupants: occupants,
        roomNumber: roomNumber,
        start: start,
        end: moment(start).add(2, "hours"),
        allDay: false,
        editable: true
      };
      title[3].checked
        ? (eventData.color = "#2196f3")
        : (eventData.color = "#4caf50");
      console.log(eventData);
      $("#calendar").fullCalendar("renderEvent", eventData, true); // stick? = true
      $("#calendar").fullCalendar("unselect");
      $("#myModal").modal("hide");
      form.reset();
      return false;
    };

    $("#myModal").modal("show");
    $("#submit")
      .off("click")
      .click(renderEventOnCalendar) ||
      $("#studentname").keypress(function(event) {
        var keycode = event.keyCode || event.which;
        if (keycode == "13") {
          e.preventDefault();
          renderEventOnCalendar();
        }
      }) ||
      $("#form").submit(function(event) {
        event.preventDefault();
      });
  };

  // page is now ready, initialize the calendar...

  $("#calendar").fullCalendar({
    // put your options and callbacks here
    themeSystem: "bootstrap3",
    defaultView: "agendaDay",
    header: {
      left: "prev,next today",
      center: "title",
      right: "agendaDay,agendaWeek,month"
    },
    hiddenDays: [0],
    bootstrapGlyphicons: {
      prev: "glyphicon-arrow-left",
      next: "glyphicon-arrow-right"
    },
    allDaySlot: false,
    minTime: "07:00:00",
    maxTime: "21:00:00",
    businessHours: [
      {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [1, 2, 3, 4, 5], // Monday - Friday
        start: "07:30", // a start time
        end: "21:00" // an end time
      },
      {
        dow: [6],
        start: "08:00",
        end: "17:00"
      }
    ],
    selectable: true,
    selectHelper: false,
    select: addEvent,
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    navLinks: true, // can click day/week names to navigate views
    eventOrder: "roomNumber",
    slotEventOverlap: false,
    events: 'events',
    views: {
      agenda: {}
    },
    eventRender: function(event, element) {
      console.log(event);
      element
        .find(".fc-time")
        .append(
          '<button type="button" id="deleteEventButton" class="close btn-delete" data-dismiss="modal" aria-label="Close"><span class="delete" aria-hidden="true">&#10006;</span></button>'
        );
      event.occupants > 1
        ? element
            .find(".fc-title")
            .append(
              "<br/> <span class='occupants'>" +
                event.occupants +
                " occupants" +
                "</span> <br/> <span class='roomNumber'>" +
                event.roomNumber +
                "</span>"
            )
        : element
            .find(".fc-title")
            .append(
              "<br/> <span class='occupants'>" +
                event.occupants +
                " occupant" +
                "</span> <br/> <span class='roomNumber'>" +
                event.roomNumber +
                "</span>"
            );
      element.find("#deleteEventButton").click(function() {
        $("#calendar").fullCalendar("removeEvents", event._id);
      });
    }
  });
});
