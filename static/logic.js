// LOAD RESUME PAGE FIRST
$("#main-body").load("pages/map.html")

 // PAGE BUTTONS

$("#resume-button").on("click", function() {
    $("#main-body").empty()
    $("#main-body").load("pages/resume.html")
})

$("#map-button").on("click", function() {
    $("#main-body").empty()
    $("#main-body").load("pages/map.html")
})











