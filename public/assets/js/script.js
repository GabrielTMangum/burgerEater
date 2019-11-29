window.onload = () => {
    console.log('test')

    $(".eatBtn").on("click", function (event) {
        console.log("hello")
        event.preventDefault();

        let updatedBurger = true;

        let id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: updatedBurger
        }).then(
            function () {
                console.log("updated quote");
                location.assign("/");
            }
        );
    });
};