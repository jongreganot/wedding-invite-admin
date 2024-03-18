import $ from "jquery";

export const setRowEvents = () => {
    $(".nav-item").on("click", (event) => {
        let parent = event.target.parentElement;
        let currentActiveLink = parent.querySelector(".active");
        $(currentActiveLink).removeClass("active");
    
        let self = event.target;
        $(self).addClass("active");
    });
}